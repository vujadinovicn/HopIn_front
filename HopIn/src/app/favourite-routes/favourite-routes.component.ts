import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {
  empty: boolean = false;
  routes: FavouriteRoute[] = [];
  isFavourite: boolean[] = [];

  constructor( private service: FavouriteRoutesService,
    public snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (res) => {
        this.routes = res;
        this.isFavourite = new Array(this.routes.length).fill(true);
        this.empty = false;
      },
      error: (error: any) => {
        this.empty = true;
      } 
    });
  }

  removeRoute(index: number): void {
    this.service.removeFavoriteRoute(index+1).subscribe({
      next: (res) => {
        this.isFavourite[index] = false;
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
    this.isFavourite[index] = false;
  }

  returnRoute(index: number): void {
    this.isFavourite[index] = true;
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
