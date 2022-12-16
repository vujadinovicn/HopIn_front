import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {
  routes: FavouriteRoute[] = [];
  isFavourite: boolean[] = [];

  constructor( private service: FavouriteRoutesService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((res) => {
      this.routes = res;
      this.isFavourite = new Array(this.routes.length).fill(false);
    });
  }

}

export interface Location {
  address: String;
  longitude: number;
  latitude: number;
}

export interface FavouriteRoute {
  id: number;
  distance: number;
  departure: Location;
  destination: Location;
}
