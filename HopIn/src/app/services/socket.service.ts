import { InviteDialogComponent } from './../invite-dialog/invite-dialog.component';
import { RideDTO } from './route.service';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import Stomp, { Message } from 'stompjs';
import { SanityChecks } from '@angular/material/core';
import { User } from './user.service';
import { MatDialog } from '@angular/material/dialog';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
    url: string = environment.apiHost + "/socket";
    ws: any;
    stompClient: any;
    isConnected: boolean = false;
    isConnectedRes: boolean = false;

    private inviteResponse = new Subject<InviteResponse>();
    invitesResSubs: any;

    constructor(private http: HttpClient, private authService: AuthService, private dialog: MatDialog) { }

    sendInvite(invite: RideInvite, to: number) {
        this.stompClient.send("/ws/send/invite/" + to, {}, JSON.stringify(invite));
        if (!this.isConnectedRes) {
            this.subscribeToInviteResponse();
            this.isConnectedRes = true;
        }
    }

    subscribeToInviteResponse() {
        this.invitesResSubs = this.stompClient.subscribe("/topic/invite-response/" + this.authService.getId(), (message: Message) => {
            this.updateInviteResponse(JSON.parse(message.body));
        });
    }

    unsubscribeFromInviteResponse() {
        this.invitesResSubs.unsubscribe();
    }

    sendInviteResponse(res: InviteResponse, to: number) {
        this.stompClient.send("/ws/send/invite-response/" + to, {}, JSON.stringify(res));
    }

    receivedInviteResponse() {
        return this.inviteResponse.asObservable();
    }
    updateInviteResponse(res: InviteResponse) {
        this.inviteResponse.next(res);
    }

    openWebSocketConnection() {
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.stompClient.subscribe("/topic/invites/" + this.authService.getId(), (message: Message) => {

                let invite: RideInvite = JSON.parse(message.body);

                this.dialog.open(InviteDialogComponent, {
                    data: {invite: invite}
                });
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

export interface InviteResponse {
    passengerId: number,
    response: boolean
}