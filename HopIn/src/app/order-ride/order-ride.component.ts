import { PickupDestinationFormComponent } from './../pickup-destination-form/pickup-destination-form.component';
import { RouteSuggestionComponent } from '../route-suggestion/route-suggestion.component';
import { Component, OnInit, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';

@Component({
  selector: 'order-ride',
  templateUrl: './order-ride.component.html',
  styleUrls: ['./order-ride.component.css']
})
export class OrderRideComponent implements OnInit {

  componentStack: any[] = [PickupDestinationFormComponent];
  currentComponent: any = this.componentStack[this.componentStack.length - 1];

  constructor() { }

  ngOnInit(): void {
  }

  public addComponent(component: any) {
    alert(component);
    if (component == "route-suggestion") {
      this.componentStack.push(RouteSuggestionComponent);
    } else {
      if (component == "pickup-form") {
        this.componentStack.pop();
      }
    }
  }

}
