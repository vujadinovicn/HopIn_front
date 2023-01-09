import { UserService } from './../services/user.service';
import { AuthService } from './../services/auth.service';
import { Routes } from '@angular/router';
import { RouteService } from './../services/route.service';
import { RoutingService } from './../services/routing.service';
import { SocketService } from './../services/socket.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './../shared/shared.service';
import { PassengerService } from './../services/passenger.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
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

  passengers: User[] = [];

  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private passengerService: PassengerService, private sharedService: SharedService,
    private socketService: SocketService, private routingService: RoutingService, private routeService: RouteService,
    private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    markFormControlsTouched(this.inviteForm);
  }

  addPassenger() {
    this.passengerService.findByEmail(this.inviteForm.value.email!).subscribe({
      next: (passenger) => {
        if (!this.hasOthers) {
          this.showLinkedFriends();
        }
        this.passengers.push(passenger);
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
    this.passengers.splice(i, 1);
    console.log(this.passengers);
  }

  orderRide() {

  }

  sendInvites() {
    console.log(this.authService.getId());
    this.userService.getByPassengerId(this.authService.getId()).subscribe({
    next: (user) => {
      let from = user;

      this.passengers.forEach(passenger => {
        this.socketService.sendInvite({from: from, ride: this.routeService.toRideDto(this.routingService.route)}, passenger.id);
      });
    },
    error: (err) => {
      this.sharedService.openSnack({
        value: "An error occured while trying to send invites.",
        color: "back-red"
      });
    }});
  }


}
