import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'unregistered-ride-form',
  templateUrl: './unregistered-ride-form.component.html',
  styleUrls: ['./unregistered-ride-form.component.css']
})
export class UnregisteredRideFormComponent implements OnInit {

  rideForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
  })

  constructor() { }

  ngOnInit(): void {
  }

  findRoute() {
    if (this.rideForm.valid) {
      alert("all ok");
    }
  }

}
