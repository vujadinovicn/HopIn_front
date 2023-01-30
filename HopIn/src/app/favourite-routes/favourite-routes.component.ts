import { AuthService } from './../services/auth.service';
import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleDialogComponent } from '../schedule-dialog/schedule-dialog.component';

@Component({
  selector: 'favourite-routes',
  templateUrl: './favourite-routes.component.html',
  styleUrls: ['./favourite-routes.component.css']
})
export class FavouriteRoutesComponent implements OnInit {
  empty: boolean = false;
  routes: FavouriteRoute[] = [];
  isFavourite: boolean[] = [];
  _id: number = 0;

  constructor( private service: FavouriteRoutesService,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog) {}

  ngOnInit(): void {
    this._id = this.authService.getId();
    this.service.getAll(this._id).subscribe({
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
    this.service.removeFavoriteRoute(this.routes[index].id, this._id).subscribe({
      next: (res) => {
        this.isFavourite[index] = false;
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
  }

  returnRoute(index: number): void {
    this.service.addFavoriteRoute(index+1, this._id).subscribe({
      next: (res) => {
        this.isFavourite[index] = true;
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
  }

  openDialog(index: number): void {
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: {pickUp: this.routes[index].departure,
             dest: this.routes[index].destination}
    });

    dialogRef.afterClosed().subscribe(result => {
      dialogRef.close();
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
