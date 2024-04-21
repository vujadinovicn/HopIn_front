import { Router } from '@angular/router';
import { RideReturnedDTO, RideService } from './ride.service';
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
import { ReminderDialogComponent } from '../reminder-dialog/reminder-dialog.component';
import { DriverTookOffService } from './driver-took-off.service';

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

    private offerResponse = new Subject<RideOfferResponseDTO>();
    offerResSubs: any;

    private startFinishResponse = new Subject<string>();
    startFinishSub: any;
    
    private panic = new Subject<Panic>();
    panicSubs: any;

    private arrivalTime = new Subject<TimerDTO>();
    arrivalTimeSubs: any;

    private vehicleArrival = new Subject<string>();
    vehicleArrivalSub: any;

    private scheduledRide = new Subject<RideReturnedDTO>();
    scheduledRideSubs: Record<number, any> = {};
    driverTookOffSubs: Record<number, any> = {};
    private subscribedToScheduled = false;

    constructor(private http: HttpClient, 
                private authService: AuthService, 
                private dialog: MatDialog, 
                private rideService: RideService,
                private driverTookOffService: DriverTookOffService,
                private router: Router) { }

    sendInvite(invite: RideInvite, to: number) {
        this.stompClient.send("/ws/send/invite/" + to, {}, JSON.stringify(invite));
        if (!this.isConnectedRes) {
            this.subscribeToInviteResponse();
            this.isConnectedRes = true;
        }
    }

    subscribeToScheduledRide(rideId: number) {
        this.scheduledRideSubs[rideId] = this.stompClient.subscribe("/topic/scheduled-ride/" + rideId, (message: Message) => {
            this.updateScheduledRide(JSON.parse(message.body));
        });
    }

    updateScheduledRide(res: RideReturnedDTO) {
        this.scheduledRide.next(res);
    }


    unsubscribeFromScheduledRide(rideId: number) {
        if (this.scheduledRideSubs[rideId] != null && this.scheduledRideSubs[rideId] != undefined) {
            this.scheduledRideSubs[rideId].unsubscribe();
            delete this.scheduledRideSubs[rideId];
        }

        if (this.authService.getRole() == "ROLE_PASSENGER") {
            if (this.driverTookOffSubs[rideId] != null && this.driverTookOffSubs[rideId] != undefined) {
                this.driverTookOffSubs[rideId].unsubscribe();
                delete this.driverTookOffSubs[rideId];
            }
        }
    }

    receivedScheduledRide() {
        return this.scheduledRide.asObservable();
    }

    subscribeToInviteResponse() {
        this.invitesResSubs = this.stompClient.subscribe("/topic/invite-response/" + this.authService.getId(), (message: Message) => {
            this.updateInviteResponse(JSON.parse(message.body));
        });
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

    subscribeToPanic() {
        this.panicSubs = this.stompClient.subscribe("/topic/panic", (message: Message) => {
            this.updatePanic(JSON.parse(message.body));
        });
    }

    unsubscribeFromPanic() {
        if (this.panicSubs != undefined)
            this.panicSubs.unsubscribe();
    }

    unsubscribeFromInviteResponse() {
        if (this.invitesResSubs != undefined)
            this.invitesResSubs.unsubscribe();
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


    sendInviteResponse(res: InviteResponse, to: number) {
        this.stompClient.send("/ws/send/invite-response/" + to, {}, JSON.stringify(res));
    }

    
    receivedInviteResponse() {
        return this.inviteResponse.asObservable();
    }
    updateInviteResponse(res: InviteResponse) {
        this.inviteResponse.next(res);
    }

    receivedOfferResponse() {
        return this.offerResponse.asObservable();
    }
    updateOfferResponse(res: RideOfferResponseDTO) {
        this.offerResponse.next(res);
    }

    subscribeToRideOfferResponse(userWhoCreatedId: number) {
        this.offerResSubs = this.stompClient.subscribe("/topic/ride-offer-response/" + userWhoCreatedId, (message: Message) => {
            this.updateOfferResponse(JSON.parse(message.body));
        });
    }

    unsubscribeFromOfferResponse() {
        if (this.offerResSubs != undefined)
            this.offerResSubs.unsubscribe();
    }
    
    receivedPanic() {
        return this.panic.asObservable();
    }
    updatePanic(res: Panic) {
        this.panic.next(res);
    }

    public subscribeFullyToScheduledRide(rideId: number) {
        this.subscribeToScheduledRide(rideId);
        if (!this.subscribedToScheduled) {
            this.receivedScheduledRide().subscribe(res => {
                this.dialog.open(ReminderDialogComponent, {
                    data: {ride: res}
                });
            });
            this.subscribedToScheduled = true;
        }
        if (this.authService.getRole() == "ROLE_PASSENGER")
            this.driverTookOffSubs[rideId] = this.stompClient.subscribe("/topic/scheduled-ride/driver-took-off/" + rideId, (message: Message) => {
                let ride: RideReturnedDTO = JSON.parse(message.body);
                this.driverTookOffService.sendDriverId(ride.driver.id);
                console.log("SCHEDULED RIDE STARTED\n" + ride);
                this.rideService.setRide(ride);
                this.router.navigate(['current-ride']);
            });
        
    }

    openWebSocketConnection() {
        this.ws = new SockJS(this.url);
        this.stompClient = Stomp.over(this.ws);
        this.stompClient.connect({}, () => {
            this.isConnected = true;
            this.subscribeToPanic();
            if (this.authService.getRole() == "ROLE_PASSENGER") {
                this.stompClient.subscribe("/topic/invites/" + this.authService.getId(), (message: Message) => {

                    let invite: RideInvite = JSON.parse(message.body);
                    if (invite.route == null) {
                        this.dialog.closeAll();
                    } else {
                        let dialogRef = this.dialog.open(InviteDialogComponent, {
                            data: {invite: invite},
                            width: 'fit-content',
                            height : 'fit-content'
                        });
                    }
                });
                this.subscribeToAllScheduledRides();
            }    
            else {
                if (this.authService.getRole() == "ROLE_DRIVER") {
                    this.stompClient.subscribe("/topic/driver/ride-offers/" + this.authService.getId(), (message: Message) => {
                        let ride: RideReturnedDTO = JSON.parse(message.body);
                        console.log(ride);
                        this.dialog.open(InviteDialogComponent, {
                            data: {ride: ride},
                            width: 'fit-content',
                            height : 'fit-content'
                        })
                    });

                    this.subscribeToAllScheduledRides();
                }
                    
                else {
                    // if (this.authService.getRole() == "ROLE_ADMIN")
                    //     this.subscribeToPanic();
                }
            }
            // if (localStorage.getItem('current_ride') != null) {
            //     let id: number = JSON.parse(localStorage.getItem('current_ride')!).id;
            //     this.subscribeRideStartFinish(JSON.parse(localStorage.getItem('current_ride')!).driver.id);
            //     this.subscribeToArrivalTime(id);
            //     if (this.authService.getRole() == "ROLE_PASSENGER")
            //         this.subscribeToVehicleArrival(id);
            // }
            
        });
    }

    subscribeToAllScheduledRides() {
        this.rideService.getAllScheduledRides(this.authService.getId()).subscribe(res => {
            res.forEach(ride => {
                this.subscribeFullyToScheduledRide(ride.id);
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
    route: Route | null
}

export interface InviteResponse {
    passengerId: number,
    response: boolean
}

export interface RideOfferResponseDTO {
    response: boolean,
    ride: RideReturnedDTO
}

export interface UserInPanic {
    name: string,
    surname: string,
    profilePictue: string,
    telephoneNumber: string,
    email: string,
    address: string,
    role: string
}

export interface Panic {
    id: number,
    user: UserInPanic,
    ride: RideReturnedDTO,
    time: string,
    reason: string
}

export interface TimerDTO {
    timer: number
}