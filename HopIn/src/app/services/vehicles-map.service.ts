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
export class VehiclesMapService {
    url: string = environment.apiHost + "/socket";
    ws: any;
    stompClient: any;
    isConnected: boolean = false;
    isConnectedRes: boolean = false;
 
    private vehicleChange = new Subject<any>();
    vehicleChangeSubs: any;

    private vehicleActivation = new Subject<any>();
    vehicleActivationSubs: any;

    private vehicleDeactivation = new Subject<any>();
    vehicleDeactivationSubs: any;

    private vehicleArrivedAtDeparture = new Subject<any>();
    vehicleArrivedAtDepartureSubs: any;

    constructor(private http: HttpClient) { }

    subscribeToVehicleArrivedAtDeparture() {
        this.vehicleArrivedAtDepartureSubs = this.stompClient.subscribe("/topic/vehicle/arrived-at-departure-message", (message: Message) => {
            this.updateVehicleArrivedAtDeparture((JSON.parse(message.body)));
        })
    }

    unsubscribeFromVehicleArrivedAtDeparture() {
        if (this.vehicleArrivedAtDepartureSubs != undefined)
            this.vehicleArrivedAtDepartureSubs.unsubscribe();
    }

    updateVehicleArrivedAtDeparture(res: any){
        this.vehicleArrivedAtDeparture.next(res);
    }

    recievedVehicleArrivedAtDeparture(){
        return this.vehicleArrivedAtDeparture.asObservable();
    }

    subscribeToVehicleDeactivation() {
        this.vehicleDeactivationSubs = this.stompClient.subscribe("/topic/vehicle/deactivation", (message: Message) => {
            this.updateVehicleDeactivation((JSON.parse(message.body)));
        })
    }

    unsubscribeFromVehicleDeactivation() {
        if (this.vehicleDeactivationSubs != undefined)
            this.vehicleDeactivationSubs.unsubscribe();
    }

    updateVehicleDeactivation(res: any){
        this.vehicleDeactivation.next(res);
    }

    recievedVehicleDeactivation(){
        return this.vehicleDeactivation.asObservable();
    }


    subscribeToVehicleActivation() {
        this.vehicleActivationSubs = this.stompClient.subscribe("/topic/vehicle/activation", (message: Message) => {
            this.updateVehicleActivation((JSON.parse(message.body)));
        }) 
    } 

    unsubscribeFromVehicleActivation() {
        if (this.vehicleActivationSubs != undefined)
            this.vehicleActivationSubs.unsubscribe();
    }

    updateVehicleActivation(res: any){
        this.vehicleActivation.next(res);
    }

    recievedVehicleActivation(){
        return this.vehicleActivation.asObservable();
    }

    subscribeToLocationChange() {
        this.vehicleChangeSubs = this.stompClient.subscribe("/topic/map-updates/update-vehicle-position", (message: Message) => {
            this.updateLocation((JSON.parse(message.body)));
        });
    }

    unsubscribeFromLocationChange() {
        if (this.vehicleChangeSubs != undefined)
            this.vehicleChangeSubs.unsubscribe();
    }

    updateLocation(res: LocationWithVehicleId) {
      this.vehicleChange.next(res);
    }

    receivedLocationChange() {
        return this.vehicleChange.asObservable();
    }

    openWebSocketConnection() {
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.subscribeToLocationChange();
            this.subscribeToVehicleActivation();
            this.subscribeToVehicleDeactivation();
            this.subscribeToVehicleArrivedAtDeparture();
        });
    }

    closeWebSocketConnection() {
        if (this.isConnected) {
            this.stompClient.disconnect();
            this.isConnected = false;
        }
    }
}

export interface LocationWithVehicleId {
    vehicleId: number,
    address: string,
    latitude: number,
    longitude: number
}