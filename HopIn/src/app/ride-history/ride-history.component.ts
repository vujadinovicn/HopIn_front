import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { AuthService } from './../services/auth.service';
import { ReviewService, CompleteRideReviewDTO } from './../services/review.service';
import { RideService, RideReturnedDTO } from './../services/ride.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FavouriteRoute } from '../favourite-routes/favourite-routes.component';
import { distinct } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {

  _role: String = ''
  _id: number = 0
  rating = 4
  rides: RideReturnedDTO[] = []
  ratings: number[] = []
  isfavoriteRoutes: boolean[] = [];
  favoriteRoutes: FavouriteRoute[] = [];

  emptyFavorite: FavouriteRoute = {
    id: 0,
    distance: 0,
    departure: {address: '', longitude: 0, latitude: 0},
    destination: {address: '', longitude: 0, latitude: 0},
  }


  constructor(private rideService: RideService,
    private reviewService: ReviewService,
    private favoriteRouteService: FavouriteRoutesService,
    public snackBar: MatSnackBar,
    private authService: AuthService) {

   }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this._role = res;
      this._id = this.authService.getId();
    })

    this.getRides();
  }

  getRides() {
    this.rideService.getAll(this._id).subscribe({
      next: (res) => {
        this.rides = res.results
        this.getRatings();
        this.setFavorites();
      },
      error: (error: any) => {
        console.log(error)
      } 
    });
  }

  getRatings() {
    this.ratings = [];
    for (let ride of this.rides.reverse()) {
      this.reviewService.getAll(ride.id).subscribe({
        next: (res) => {
          let sum = 0;
          let counter = 0;
          for(let pair of res) {
            if (pair.vehicleReview != null) {
              sum += pair.vehicleReview.rating
              counter++;
            }
            if (pair.driverReview != null) {
              sum += pair.driverReview.rating
              counter++;
            }
          }
          this.ratings.push(ride.id);
          if (sum != 0) {
            this.ratings.pop();
            this.ratings.push(sum/counter);
          }
        },
        error: (error: any) => {
          console.log(error)
        } 
      });
    }
  }

  setFavorites() {
    this.favoriteRouteService.getAll(this._id).subscribe({
      next: (res) => {
        this.isfavoriteRoutes = [];
        this.favoriteRoutes = [];
        for(let ride of this.rides.reverse()) {
          this.isfavoriteRoutes.push(false);
          this.favoriteRoutes.push(this.emptyFavorite);
          for (let route of res) {
            if (route.departure.latitude == ride.locations[0].departure.latitude && route.departure.longitude == ride.locations[0].departure.longitude) {
              if (route.destination.latitude == ride.locations[0].destination.latitude && route.destination.longitude == ride.locations[0].destination.longitude) {
                this.isfavoriteRoutes.pop();
                this.favoriteRoutes.pop();
                this.isfavoriteRoutes.push(true);
                this.favoriteRoutes.push(route);
              }
            } 
          }
        }
        console.log(this.favoriteRoutes);
      },
      error: (error: any) => {
        this.isfavoriteRoutes = new Array(this.rides.length).fill(false);
        this.favoriteRoutes = new Array(this.rides.length).fill(this.emptyFavorite);
      } 
    });
  }


  removeRoute(index: number): void {
    this.favoriteRouteService.removeFavoriteRoute(this.favoriteRoutes[index].id, this._id).subscribe({
      next: (res) => {
        this.getRides();
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
  }

  returnRoute(index: number): void {
    let route: FavouriteRoute = {
      id: 0,
      distance: this.rides[index].distance,
      departure: this.rides[index].locations[0].departure,
      destination: this.rides[index].locations[0].destination
    }
    this.favoriteRouteService.addNewFavoriteRoute(this._id, route).subscribe({
      next: (res) => {
        this.getRides();
      },
      error: (error: any) => {
        this.snackBar.open("Sorry, server is currenty unavailable!", "", {
          duration: 2000,
       });
      } 
    });
  }


}
