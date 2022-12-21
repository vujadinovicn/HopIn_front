import { Router } from '@angular/router';
import { ShortAddress, Route, RoutingService } from './../services/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  notValid: Boolean[] = [false, false];

  rideForm = new FormGroup({
    pickup: new FormControl('', [Validators.required, autocompleteValidator(this, 0)]),
    destination: new FormControl('', [Validators.required, autocompleteValidator(this, 1)]),
    time: new FormControl('', [timeFormatValidator, schedulingValidator()]),
  });

  role: any;
  route: Route = {} as Route;

  constructor(private routingService: RoutingService, private router: Router) { 
    this.role = 'USER';
  }

  ngOnInit(): void {
    markFormControlsTouched(this.rideForm);
  }


  findRoute() {
    if (this.rideForm.valid) {
      this.route.scheduledTime = this.rideForm.get('time')?.value!;
      this.routingService.updateRoute(this.route);
      this.router.navigate(['/route-suggestion']);
      // console.log(this.route);
    }
  }

  public handlePickupChange(address: Address) {
      if (this.checkAutocompleteValidity(address, 0, 'pickup')) {
        this.route.pickup = {
          formatted: address.formatted_address,
          lat: address.geometry.location.lat(),
          lng: address.geometry.location.lng(),
        }
      }
  }

  public handleDestinationChange(address: Address) {
    if (this.checkAutocompleteValidity(address, 1, 'destination')) {
      this.route.destination = {
        formatted: address.formatted_address,
        lat: address.geometry.location.lat(),
        lng: address.geometry.location.lng(),
      }
    }
  }

  private checkAutocompleteValidity(address: Address, i: number, type: string): Boolean {
    this.chosenAddress[i] = address;
    this.changed[i] = true;
    this.odl_addr[i] = this.rideForm.get(type)?.value!;
    if (!address.geometry) {
      this.notValid[i] = true;
    } else {
      this.notValid[i] = false;
    }
    this.rideForm.get(type)?.updateValueAndValidity();
    return !this.notValid[i];
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