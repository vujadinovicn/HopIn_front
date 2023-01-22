import { AuthService } from './../services/auth.service';
import { RoutingService } from './../services/routing.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'vehicle-preferences-form',
  templateUrl: './vehicle-preferences-form.component.html',
  styleUrls: ['./vehicle-preferences-form.component.css']
})
export class VehiclePreferencesFormComponent implements OnInit {

  @Output() disableOtherStepsEvent = new EventEmitter<boolean>();
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
    this.routingService.setDefaultUser();
    
    this.stepper.selected!.completed = true;
    this.disableOtherStepsEvent.emit(true);
    this.stepper.next();
  }

  orderRide() {
    this.updateValues();
    this.routingService.setDefaultUser();

    this.routingService.findRoute();
  }

  private updateValues() {
    this.routingService.route.babyTransport = this.isBabyTransport;
    this.routingService.route.petTransport = this.isPetTransport;
    this.routingService.route.vehicleTypeName = this.vehicleType.toUpperCase();
  }

  

}
