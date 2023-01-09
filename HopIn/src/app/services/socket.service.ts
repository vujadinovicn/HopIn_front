import { RideDTO } from './route.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs';
import SockJS from 'sockjs-client';
import Stomp, { Message } from 'stompjs';
import { SanityChecks } from '@angular/material/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
    url: string = environment.apiHost + "/socket";
    ws: any;
    stompClient: any;
    isConnected: boolean = false;

    constructor(private http: HttpClient, private authService: AuthService) { }

    sendInvite(invite: RideInvite, to: number) {
        this.stompClient.send("/ws/send/invite/" + to, {}, JSON.stringify(invite));
    }

    openWebSocketConnection() {
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.stompClient.subscribe("/topic/invites/" + this.authService.getId(), (message: Message) => {
                console.log(message.body);
            });
        });
    }

    closeWebSocketConnection() {
        if (this.isConnected) {
            this.stompClient.disconnect();
            this.isConnected = false;
        }
    }
}

export interface RideInvite {
    from: User,
    ride: RideDTO
}