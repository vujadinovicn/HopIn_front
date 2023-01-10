import { Component, OnInit, Input } from '@angular/core';
import { Route, RoutingService } from '../services/routing.service';

@Component({
  selector: 'route-suggestion-details',
  templateUrl: './route-suggestion-details.component.html',
  styleUrls: ['./route-suggestion-details.component.css']
})
export class RouteSuggestionDetailsComponent implements OnInit {

  @Input() route: Route = {} as Route;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
