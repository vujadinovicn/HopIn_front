import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

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
  route: Route = {
    pickup: {} as ShortAddress,
    destination: {} as ShortAddress, 
  };

  constructor() { 
    this.role = null;
  }

  ngOnInit(): void {
  }

  findRoute() {
    if (this.rideForm.valid) {
      console.log(this.route);
    }
  }

  public handlePickupChange(address: Address) {
    this.route.pickup = {
      fromatted: address.formatted_address,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    }
  }

  public handleDestinationChange(address: Address) {
    this.route.destination = {
      fromatted: address.formatted_address,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    }
  }
  

}

interface Route {
    pickup: ShortAddress,
    destination: ShortAddress,
}

interface ShortAddress {
  fromatted: String,
  lat: number,
  lng: number
}
