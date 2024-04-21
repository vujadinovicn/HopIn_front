import { RideReturnedDTO } from './ride.service';
import { Route } from './routing.service';
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
import { TimerDTO } from './socket.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentRideSocketService {
    
    url: string = environment.apiHost + "/socket";
    ws: any;
    stompClient: any;
    isConnected: boolean = false;
    isConnectedRes: boolean = false;

    private startFinishResponse = new Subject<string>();
    startFinishSub: any;

    private arrivalTime = new Subject<TimerDTO>();
    arrivalTimeSubs: any;

    private vehicleArrival = new Subject<string>();
    vehicleArrivalSub: any;

    constructor(private http: HttpClient){

    }

    subscribeToArrivalTime(rideId: number) {
        this.arrivalTimeSubs = this.stompClient.subscribe("/topic/arrival-time/" + rideId, (message: Message) => {
            this.updateArrivalTime(JSON.parse(message.body));
        });
    }

    unsubscribeFromArrivalTime() {
        if (this.arrivalTimeSubs != undefined)
            this.arrivalTimeSubs.unsubscribe();
    }

    receivedArrivalTime() {
        return this.arrivalTime.asObservable();
    }

    updateArrivalTime(res: TimerDTO) {
        console.log("#############################")
        console.log(res);
        console.log("#############################")
        this.arrivalTime.next(res);
    }

    subscribeRideStartFinish(driverId: number) {
        this.startFinishSub = this.stompClient.subscribe("/topic/ride-start-finish/" + driverId, (message: Message) =>  {
            this.updateStartFinishResponse(message.body);
        });   
    }

    unsubscribeFromStartFinishResponse() {
        if (this.startFinishResponse != undefined)
            this.startFinishResponse.unsubscribe();
    }

    receivedStartFinishResponse() {
        return this.startFinishResponse.asObservable();
    }

    updateStartFinishResponse(res: string) {
        this.startFinishResponse.next(res);
    }

    subscribeToVehicleArrival(rideId: number) {
        this.vehicleArrivalSub = this.stompClient.subscribe("/topic/vehicle-arrival/" + rideId, (message: Message) =>  {
            this.updateVehicleArrival(message.body);
        });   
    }

    unsubscribeFromVehicleArrival() {
        if (this.vehicleArrivalSub != undefined)
            this.vehicleArrivalSub.unsubscribe();
    }

    receivedVehicleArrival() {
        return this.vehicleArrival.asObservable();
    }

    updateVehicleArrival(res: string) {
        this.vehicleArrival.next(res);
    }

    openWebSocketConnection(rideId: number, driverId: number) {
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.subscribeRideStartFinish(driverId);
            this.subscribeToArrivalTime(rideId);
            this.subscribeToVehicleArrival(rideId);
            
        });
    }

    closeWebSocketConnection() {
        if (this.isConnected) {
            this.stompClient.disconnect();
            this.isConnected = false;
        }
    }


}