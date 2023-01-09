import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './../shared/shared.service';
import { PassengerService } from './../services/passenger.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { User } from '../services/user.service';

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

  constructor(private passengerService: PassengerService, private sharedService: SharedService) { }

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

  }


}
