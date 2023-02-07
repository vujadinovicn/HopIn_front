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
import { LocationNoId } from './vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class RideSocketService {
    url: string = environment.apiHost + "/socket";
    ws: any;
    stompClient: any;
    isConnected: boolean = false;
    isConnectedRes: boolean = false;
 
    private ridePending = new Subject<any>();
    ridePendingSubs: any;

    private rideFinished = new Subject<any>();
    rideFinishedSubs: any;

    private rideCanceled = new Subject<any>();
    rideCanceledSubs: any;

    private rideAccepted = new Subject<any>();
    rideAcceptedSubs: any;
    
    subscribeToRidePending() {
        this.ridePendingSubs = this.stompClient.subscribe("/topic/ride-pending", (message: Message) => {
            this.updateRidePending((JSON.parse(message.body)));
        });
    }

    unsubscribeFromRidePending() {
        if (this.ridePendingSubs != undefined)
            this.ridePendingSubs.unsubscribe();
    }

    updateRidePending(res: any) {
      this.ridePending.next(res);
    }

    receivedRidePending() {
        return this.ridePending.asObservable();
    }

    subscribeToRideFinished() {
        this.rideFinishedSubs = this.stompClient.subscribe("/topic/ride-finish", (message: Message) => {
            this.updateRideFinished((JSON.parse(message.body)));
        });
    }

    unsubscribeFromRideFinished() {
        if (this.rideFinishedSubs != undefined)
            this.rideFinishedSubs.unsubscribe();
    }

    updateRideFinished(res: any) {
      this.rideFinished.next(res);
    }

    receivedRideFinished() {
        return this.rideFinished.asObservable();
    }


    subscribeToRideCanceled() {
        this.rideCanceledSubs = this.stompClient.subscribe("/topic/ride-cancel", (message: Message) => {
            this.updateRideCanceled((JSON.parse(message.body)));
        });
    }

    unsubscribeFromRideCanceled() {
        if (this.rideCanceledSubs != undefined)
            this.rideCanceledSubs.unsubscribe();
    }

    updateRideCanceled(res: any) {
      this.rideCanceled.next(res);
    }

    receivedRideCanceled() {
        return this.rideCanceled.asObservable();
    }


    subscribeToRideAccepted() {
        this.rideAcceptedSubs = this.stompClient.subscribe("/topic/ride-accept", (message: Message) => {
            this.updateRideAccepted((JSON.parse(message.body)));
        });
    }

    unsubscribeFromRideAccepted() {
        if (this.rideAcceptedSubs != undefined)
            this.rideAcceptedSubs.unsubscribe();
    }

    updateRideAccepted(res: any) {
      this.rideAccepted.next(res);
    }

    receivedRideAccepted() {
        return this.rideAccepted.asObservable();
    }

    openWebSocketConnection() {
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.subscribeToRidePending();
            this.subscribeToRideAccepted();
            this.subscribeToRideCanceled();
            this.subscribeToRideFinished();
        });
    }

    closeWebSocketConnection() {
        if (this.isConnected) {
            this.stompClient.disconnect();
            this.isConnected = false;
        }
    }
}