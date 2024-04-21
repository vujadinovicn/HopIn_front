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

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let minutes = date.getMinutes() + "";
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    return date.getHours() + ":" + minutes + ", " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
  }

}
