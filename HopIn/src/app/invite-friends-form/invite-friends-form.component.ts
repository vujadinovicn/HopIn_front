import { RidePassenger } from './../services/routing.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { markFormControlsTouched } from '../validators/formGroupValidators';

@Component({
  selector: 'invite-friends-form',
  templateUrl: './invite-friends-form.component.html',
  styleUrls: ['./invite-friends-form.component.css']
})
export class InviteFriendsFormComponent implements OnInit {

  passengers: RidePassenger[] = [];

  inviteForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor() { }

  ngOnInit(): void {
    markFormControlsTouched(this.inviteForm);
  }

  addPassenger() {

  }

  removePassenger() {

  }

  orderRide() {

  }


}
