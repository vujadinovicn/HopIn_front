import { AuthService } from './../services/auth.service';
import { RoutingService } from './../services/routing.service';
import { FormGroup } from '@angular/forms';
import { PickupDestinationFormComponent } from './../pickup-destination-form/pickup-destination-form.component';
import { RouteSuggestionComponent } from '../route-suggestion/route-suggestion.component';
import { Component, Input, OnInit, ViewChild, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'order-ride',
  templateUrl: './order-ride.component.html',
  styleUrls: ['./order-ride.component.css']
})
export class OrderRideComponent implements OnInit {

  isEditable: boolean = true;

  rideForm: FormGroup = {} as FormGroup;
  @ViewChild('stepper') private stepper: MatStepper = {} as MatStepper;

  constructor(private routingService: RoutingService) {
  }

  ngOnInit(): void {
  }

 

}
