import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {
  routes: FavouriteRoute[] = [];

  constructor( private service: FavouriteRoutesService) {}

  ngOnInit(): void {
    this.routes = this.service.getAll();
  }

}

export interface FavouriteRoute {
  _id: number;
  from: String;
  to: String;
  distance: number;
  durationHours: number;
  durationMins: number;
}
