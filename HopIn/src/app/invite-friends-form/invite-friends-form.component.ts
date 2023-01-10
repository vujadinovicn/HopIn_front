import { Subscription } from 'rxjs';
import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';

import { RouteService } from './../services/route.service';
import { Route, RoutingService } from './../services/routing.service';
import { SocketService, InviteResponse } from './../services/socket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './../shared/shared.service';
import { PassengerService } from './../services/passenger.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { User } from '../services/user.service';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'invite-friends-form',
  templateUrl: './invite-friends-form.component.html',
  styleUrls: ['./invite-friends-form.component.css']
})
export class InviteFriendsFormComponent implements OnInit {

  hasOthers: boolean = false;

  passengersInvited: User[] = [];
  invitationResponses: (boolean | null)[] = [];

  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  invitationSent: boolean = false;

  constructor(private passengerService: PassengerService, private sharedService: SharedService,
    private socketService: SocketService, private routingService: RoutingService, private routeService: RouteService,
    private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    markFormControlsTouched(this.inviteForm);
  }

  addPassenger() {
    this.passengerService.findByEmail(this.inviteForm.value.email!).subscribe({
      next: (passenger: User) => {

        if (passenger.id != this.authService.getId()) {
          if (!this.hasOthers) {
            this.showLinkedFriends();
          }
          this.passengersInvited.push(passenger);
        }
        else {
          this.sharedService.openSnack({
            value: "Can't send invite to yourself.",
            color: "back-red"
          });
        }

       
      }, 
      error: (err: HttpErrorResponse) => {
        if (err.status == 404)
          this.sharedService.openSnack({
            value: "Seems like there's no active passenger with that email.",
            color: "back-red"
          });
        else 
          this.sharedService.openSnack({
            value: "An error occured while trying to fetch data.",
            color: "back-red"
          });
      }
    });
  }

  showLinkedFriends() {
    this.hasOthers = true;
  }

  removePassenger(i: number) {
    this.passengersInvited.splice(i, 1);
    console.log(this.passengersInvited);
  }

  orderRide() {
    this.socketService.unsubscribeFromInviteResponse();
    console.log(this.routingService.route);
    this.routeService.createRide(this.routingService.route).subscribe((res) => {
      console.log(res);
    });
  }

  sendInvites() {
    this.userService.getByPassengerId(this.authService.getId()).subscribe({
    next: (user) => {
      let from = user;

      this.socketService.receivedInviteResponse().subscribe((response: InviteResponse) => {
        response.response? this.passengerAccepted(response.passengerId) : this.passengerDeclined(response.passengerId);
      });

      this.routingService.setDefaultUser();

      this.passengersInvited.forEach(passenger => {
        this.socketService.sendInvite({from: from, route: this.routingService.route}, passenger.id);
        this.invitationResponses.push(null);
      });

    },
    error: (err) => {
      this.sharedService.openSnack({
        value: "An error occured while trying to send invites.",
        color: "back-red"
      });
    }});
  }

  populateRide(type: string) {
    if (type == 'invites') {
      this.invitationSent = true;
      this.routingService.invite = true;
      this.routingService.findRoute();
      let sub: Subscription = this.routingService.receivedRoute().subscribe((route: Route) => {
        this.sendInvites();
        this.routingService.invite = false;
        sub.unsubscribe();
      });
    } else {
      if (type == 'order') {
        this.routingService.findRoute();
        let sub: Subscription = this.routingService.receivedRoute().subscribe((route: Route) => {
          this.orderRide();
          sub.unsubscribe();
        });
      }
    }
    
    
  }

  private passengerAccepted(id: number) {
    let passenger = this.passengersInvited.find(x => x.id == id);

    if (passenger != undefined) {
      let i = this.passengersInvited.indexOf(passenger);
      this.routingService.route.passengers.push({id: passenger.id, email: passenger.email});
      this.invitationResponses[i] = true;
    }
  }

  private passengerDeclined(id: number) {
    let passenger = this.passengersInvited.find(x => x.id == id);

    if (passenger != undefined) {
      let i = this.passengersInvited.indexOf(passenger);
      this.invitationResponses[i] = false;
    }
  }

}
