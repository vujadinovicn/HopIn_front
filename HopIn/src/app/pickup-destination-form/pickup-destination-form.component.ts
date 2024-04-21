import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { AuthService } from './../services/auth.service';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { ShortAddress, Route, RoutingService } from './../services/routing.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { autocompleteValidator } from '../validators/autocompleteValidator';
import { schedulingValidator } from '../validators/schedulingValidator';
import { timeFormatValidator } from '../validators/timeFormatValidator';
import { PickupDestinationService } from '../services/pickup-destination.service';
import { markFormControlsTouched } from '../validators/formGroupValidators';
import { FavouriteRoute } from '../favourite-routes/favourite-routes.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'pickup-destination-form',
  templateUrl: './pickup-destination-form.component.html',
  styleUrls: ['./pickup-destination-form.component.css']
})
export class PickupDestinationFormComponent implements OnInit {

  @Input() stepper: MatStepper = {} as MatStepper;

  chosenAddress: Address[] = [];

  changed: Boolean[] = [false, false];
  odl_addr: String[] = [];
  notValid: Boolean[] = [false, false];
  markerGenerated: Boolean[] = [false, false];
  isFavorite: boolean = false;
  favoriteId: number = 0;

  rideForm = new FormGroup({
    pickup: new FormControl('', [Validators.required, autocompleteValidator(this, 0)]),
    destination: new FormControl('', [Validators.required, autocompleteValidator(this, 1)]),
    time: new FormControl('', [timeFormatValidator, schedulingValidator()]),
  });

  role: any;
  id: any;
  route: Route = {} as Route;

  constructor(private routingService: RoutingService, private router: Router,
              private pickupDestinationService: PickupDestinationService, public authService: AuthService,
              private favoriteRouteService: FavouriteRoutesService,
              public snackBar: MatSnackBar,) { 
    this.role = this.authService.getRole();
    this.id = this.authService.getId();
  }

  ngOnInit(): void {
    if (this.routingService.isFromHistory) {
      this.rideForm.get("pickup")?.setValue(this.routingService.route.pickup.address);
      this.rideForm.get("destination")?.setValue(this.routingService.route.destination.address);

      // this.stepper.selected!.completed = true;
      // this.stepper.next();
      this.stepper.selectedIndex = 1;
    }
    markFormControlsTouched(this.rideForm);
    this.listenToMarkers();
  }

  listenToMarkers() {
    this.pickupDestinationService.receivedPickup().subscribe((address: ShortAddress) => {
      this.markerGenerated[0] = true;
      this.rideForm.get("pickup")?.setValue(address.address);
      this.route.pickup = address;
    });

    this.pickupDestinationService.receivedDestination().subscribe((address: ShortAddress) => {
      this.markerGenerated[1] = true;
      this.rideForm.get("destination")?.setValue(address.address);
      this.route.destination = address;
    });
  }


  findRoute() {
    if (this.rideForm.valid) {
      // if (this.rideForm.get('time')?.value! != null){
      //   let hours = this.rideForm.get('time')?.value!.split(":")[0];
      //   let mins = this.rideForm.get('time')?.value!.split(":")[1];
      //   // if (hours != undefined) {
      //   //   let hoursPlusOne = parseInt(hours) + 1;
      //   //   this.route.scheduledTime = hoursPlusOne + ":" + mins;
      //   // }
      // }
      // else
        this.route.scheduledTime = this.rideForm.get('time')?.value!;
      console.log(this.rideForm.get('time')?.value!);
      // for now, until stepper is implemented properly
      this.route.vehicleTypeName = "STANDARD";

      this.routingService.route = this.route;
      this.routingService.findRoute();
      this.routingService.receivedRoute().subscribe((route: Route) => {
        this.router.navigate(['/route-suggestion']);
      });
      
    }
  }

  nextStep() {
    this.rideForm.markAllAsTouched();
    if (this.rideForm.valid) {
      // console.log('\n' + this.rideForm.get('time')?.value! + '\n');
      // this.route.scheduledTime = this.rideForm.get('time')?.value!;
      // if (this.rideForm.get('time')?.value! != null){
      //   let hours = this.rideForm.get('time')?.value!.split(":")[0];
      //   let mins = this.rideForm.get('time')?.value!.split(":")[1];
      //   // if (hours != undefined) {
      //   //   let hoursPlusOne = parseInt(hours) - 1;
      //   //   this.routingService.route.scheduledTime = hoursPlusOne + ":" + mins;
      //   // }
      // }
      // else
      this.routingService.route.scheduledTime = this.rideForm.get('time')?.value!;
      // this.routingService.route.scheduledTime = this.rideForm.get('time')?.value!;
      this.routingService.route.pickup = this.route.pickup;
      this.routingService.route.destination = this.route.destination;

      this.stepper.selected!.completed = true;
      this.stepper.next();
    }
  }

  public handlePickupChange(address: Address) {
    this.markerGenerated[0] = false;
    if (this.checkAutocompleteValidity(address, 0, 'pickup')) {
      this.route.pickup = {
        address: address.formatted_address,
        latitude: address.geometry.location.lat(),
        longitude: address.geometry.location.lng(),
      }
    }
  }

  public handleDestinationChange(address: Address) {
    this.markerGenerated[1] = false;
    if (this.checkAutocompleteValidity(address, 1, 'destination')) {
      this.route.destination = {
        address: address.formatted_address,
        latitude: address.geometry.location.lat(),
        longitude: address.geometry.location.lng(),
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


  removeRoute(): void {
    this.favoriteRouteService.removeFavoriteRoute(this.favoriteId, this.id).subscribe({
      next: (res) => {
        this.favoriteId = 0;
        this.isFavorite = false;
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
  }

  returnRoute(): void {
    let pickUp = this.route.pickup.address.split(',')[0];
    let dest = this.route.destination.address.split(',')[0];
    let favRoute: FavouriteRoute = {
      id: 0,
      distance: this.route.distance,
      departure: {address: pickUp, latitude: this.route.pickup.latitude, longitude: this.route.pickup.longitude},
      destination: {address: dest, latitude: this.route.destination.latitude, longitude: this.route.destination.longitude}
    }
    this.favoriteRouteService.addNewFavoriteRoute(this.id, favRoute).subscribe({
      next: (res) => {
        this.favoriteId = res.id;
        this.isFavorite = true;
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
  }

}
