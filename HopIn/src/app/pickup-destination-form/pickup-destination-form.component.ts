import { ShortAddress, Route, RoutingService } from './../services/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { autocompleteValidator } from '../validators/autocompleteValidator';
import { schedulingValidator } from '../validators/schedulingValidator';
import { timeFormatValidator } from '../validators/timeFormatValidator';

@Component({
  selector: 'pickup-destination-form',
  templateUrl: './pickup-destination-form.component.html',
  styleUrls: ['./pickup-destination-form.component.css']
})
export class PickupDestinationFormComponent implements OnInit {

  chosenAddress: Address[] = [];

  changed: Boolean[] = [false, false];
  odl_addr: String[] = [];

  rideForm = new FormGroup({
    pickup: new FormControl('', [Validators.required, autocompleteValidator(this, 0)]),
    destination: new FormControl('', [Validators.required, autocompleteValidator(this, 1)]),
    time: new FormControl('', [timeFormatValidator, schedulingValidator()]),
  });

  role: any;
  route: Route = {
    pickup: {} as ShortAddress,
    destination: {} as ShortAddress, 
    scheduledTime: ''
  };

  constructor(private routingService: RoutingService) { 
    this.role = 'USER';
  }

  ngOnInit(): void {
    markFormControlsTouched(this.rideForm);
  }

  findRoute() {
    if (this.rideForm.valid) {
      this.route.scheduledTime = this.rideForm.get('time')?.value!;
      this.routingService.updateRoute(this.route);

      console.log(this.route);
    }
  }

  public handlePickupChange(address: Address) {
    this.chosenAddress[0] = address;
    this.changed[0] = true;
    this.odl_addr[0] = this.rideForm.get('pickup')?.value!;
    this.rideForm.get('pickup')?.updateValueAndValidity();
    this.route.pickup = {
      fromatted: address.formatted_address,
      lat: address.geometry.location.lat(),
      lng: address.geometry.location.lng(),
    }
  }

  public handleDestinationChange(address: Address) {
    this.chosenAddress[1] = address;
    this.changed[1] = true;
    this.odl_addr[1] = this.rideForm.get('destination')?.value!;
    this.rideForm.get('destination')?.updateValueAndValidity();
      this.route.destination = {
        fromatted: address.formatted_address,
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng(),
      }
  }

  public getCurrentTime(): string {
    let currDate = new Date();
    return currDate.getHours + ":" + currDate.getMinutes;
  }

  public getMaxTime(): string {
    let currDate = new Date();
    let totalMins = currDate.getHours()*60 + currDate.getMinutes();
    totalMins = totalMins + 300;
    let calcHours = Math.floor(totalMins/60);
    console.log(calcHours + ":" + (totalMins - calcHours*60))
    return calcHours + ":" + (totalMins - calcHours*60);
  }

}

export function markFormControlsTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach((control: FormControl) => {
    control.valueChanges.subscribe(() => {
      control.markAsTouched();
    })
  });
}