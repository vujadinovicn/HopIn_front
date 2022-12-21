import { Route, RoutingService } from './../services/routing.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'route-suggestion',
  templateUrl: './route-suggestion.component.html',
  styleUrls: ['./route-suggestion.component.css']
})
export class RouteSuggestionComponent implements OnInit {

  route: Route = {} as Route;

  constructor(private routingService: RoutingService) { 
    this.route = routingService.route;
  }

  ngOnInit(): void {
  }

}
