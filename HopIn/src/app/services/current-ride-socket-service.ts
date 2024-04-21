import { RideReturnedDTO } from './ride.service';

import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, Subject } from 'rxjs';
import SockJS from 'sockjs-client';
import Stomp, { Message } from 'stompjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class CurrentRideSocketService {
    url: string = environment.apiHost + "/socket";
    ws: any;
    stompClient: any;
    isConnected: boolean = false;
    isConnectedRes: boolean = false;

    private startFinishResponse = new Subject<RideReturnedDTO>();
    startFinishSub: any;

    private arrivalTime = new Subject<TimerDTO>();
    arrivalTimeSubs: any;

    private vehicleArrival = new Subject<string>();
    vehicleArrivalSub: any;

    private rideCancel = new Subject<boolean>();
    rideCancelSubs: any;

    constructor(private http: HttpClient, private authService: AuthService, private dialog: MatDialog) { }

    

    subscribeToRideCancel(driverId: number) {
        this.rideCancelSubs = this.stompClient.subscribe("/topic/ride-cancel/" + driverId, (message: Message) => {
            this.updateRideCancel(JSON.parse(message.body));
        });
    }

    unsubscribeFromRideCancel() {
        if (this.rideCancelSubs != undefined)
            this.rideCancelSubs.unsubscribe();
    }

    receivedRideCancel() {
        return this.rideCancel.asObservable();
    }

    updateRideCancel(res: boolean) {
        console.log("#############################")
        console.log(res);
        console.log("#############################")
        this.rideCancel.next(res);
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
            this.updateStartFinishResponse(JSON.parse(message.body));
        });   
    }

    unsubscribeFromStartFinishResponse() {
        if (this.startFinishResponse != undefined)
            this.startFinishResponse.unsubscribe();
    }

    receivedStartFinishResponse() {
        return this.startFinishResponse.asObservable();
    }

    updateStartFinishResponse(res: RideReturnedDTO) {
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

    openWebSocketConnection() {
        if (this.isConnected) {
            return;
        }
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            if (localStorage.getItem('current_ride') != null) {
                let id: number = JSON.parse(localStorage.getItem('current_ride')!).id;
                
                this.subscribeToArrivalTime(id);
                this.subscribeToVehicleArrival(id);
                if (this.authService.getRole() == "ROLE_PASSENGER") { 
                    this.subscribeRideStartFinish(JSON.parse(localStorage.getItem('current_ride')!).driver.id);
                    this.subscribeToRideCancel(JSON.parse(localStorage.getItem('current_ride')!).driver.id);
                }
                
            }
            
        });
    }

    closeWebSocketConnection() {
        if (this.isConnected) {
            this.stompClient.disconnect();
            this.isConnected = false;
        }
    }
}

export interface TimerDTO {
    timer: number
}