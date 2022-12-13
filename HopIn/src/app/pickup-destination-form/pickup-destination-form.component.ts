import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pickup-destination-form',
  templateUrl: './pickup-destination-form.component.html',
  styleUrls: ['./pickup-destination-form.component.css']
})
export class PickupDestinationFormComponent implements OnInit {

  rideForm = new FormGroup({
    pickup: new FormControl('', [Validators.required]),
    destination: new FormControl('', [Validators.required]),
    time: new FormControl('')
  })

  role: any;

  constructor() { 
    this.role = null;
  }

  ngOnInit(): void {
  }

  findRoute() {
    if (this.rideForm.valid) {
      alert("all ok");
    }
  }

  public handleAddressChange(address: any) {

  }

}
