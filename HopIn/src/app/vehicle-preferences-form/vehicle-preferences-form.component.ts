import { AuthService } from './../services/auth.service';
import { RoutingService } from './../services/routing.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'vehicle-preferences-form',
  templateUrl: './vehicle-preferences-form.component.html',
  styleUrls: ['./vehicle-preferences-form.component.css']
})
export class VehiclePreferencesFormComponent implements OnInit {

  @Input() stepper: MatStepper = {} as MatStepper;

  vehicleType : string = "car";
  isBabyTransport : boolean = false;
  isPetTransport: boolean = false;

  constructor(private routingService: RoutingService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  changeVehicleType(vehicleType: string) : void {
    this.vehicleType = vehicleType.toLowerCase();
  }

  nextStep() {
    this.updateValues();

    this.stepper.selected!.completed = true;
    this.stepper.next();
  }

  orderRide() {
    this.updateValues();
    this.setDefaultUser();

    this.routingService.findRoute();
  }

  private updateValues() {
    this.routingService.route.babyTransport = this.isBabyTransport;
    this.routingService.route.petTransport = this.isPetTransport;
    this.routingService.route.vehicleTypeName = this.vehicleType.toUpperCase();
  }

  private setDefaultUser() {
    this.routingService.route.passengers = [{
      id: this.authService.getId(),
      email: this.authService.getEmail()
    }];
  }

}
