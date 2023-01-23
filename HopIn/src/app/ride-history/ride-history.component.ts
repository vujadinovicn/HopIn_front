import { FavouriteRoutesService } from './../favouriteRoutesService/favourite-routes.service';
import { AuthService } from './../services/auth.service';
import { ReviewService, CompleteRideReviewDTO } from './../services/review.service';
import { RideService, RideReturnedDTO } from './../services/ride.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FavouriteRoute } from '../favourite-routes/favourite-routes.component';
import { distinct } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PassengerAccountOptionsService } from '../services/passengerAccountOptions.service';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatSortable, Sort } from '@angular/material/sort/sort';
import { Router } from '@angular/router';
@Component({
  selector: 'ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {

  _role: String = ''
  _id: number = 0
  currentRidesToShow: RideReturnedDTO[] = [];
  rides: RideReturnedDTO[] = [];

  ratings: number[] = [];
  currentRatingsToShow: number[] = [];

  isfavoriteRoutes: boolean[] = [];
  currentIsFavoriteRoutesToShow: boolean[] = [];

  favoriteRoutes: FavouriteRoute[] = [];
  currentFavoriteRoutesToShow: FavouriteRoute[] = [];
  id_input: number = 0;
  isPassenger: boolean = false;
  selectedType: String = 'Date';

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
    private authService: AuthService,
    private router: Router,
    private passengerAccountOptionsService: PassengerAccountOptionsService) {

   }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this._role = res;
      this._id = this.authService.getId();
    })

    if (this._role != 'ROLE_ADMIN') {
      this.getRides();
    }
  }

  onPageChange($event: any) {
    this.currentRidesToShow =  this.rides.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
    this.currentRatingsToShow = this.ratings.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
    this.currentIsFavoriteRoutesToShow = this.isfavoriteRoutes.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  getRides() {
    if (this._role === 'ROLE_PASSENGER') {
      this.getPassengerRides(this._id);
    } else if (this._role === 'ROLE_DRIVER') {
      this.getDriverRides(this._id);
    } else {
      if (this.id_input < 1) {
        this.snackBar.open("Id must be greater than 0!", "", {
          duration: 2000,
       });
      }
      if (this.isPassenger) {
        this.getPassengerRides(this.id_input);
      } else {
        this.getDriverRides(this.id_input);
      }
    }
  }

  getPassengerRides(id: number) {
    this.rideService.getAllPassengerRides(id).subscribe({
      next: (res) => {
        this.rides = res.results;
        this.currentRidesToShow = res.results;
        if (res.results.length > 3) {
          this.currentRidesToShow = res.results.slice(0,3);
        }
        if (res.results.length === 0) {
          this.snackBar.open("System didn't find any past rides.", "", {
            duration: 2000,
         });
        }
        this.getRatings();
        this.setFavorites();
      },
      error: (error: any) => {
        this.rides = [];
        this.currentRidesToShow = [];
        this.snackBar.open("Passenger does not exist!", "", {
          duration: 2000,
       });
      } 
    });
  }

  getDriverRides(id: number) {
    this.rideService.getAllDriverRides(id).subscribe({
      next: (res) => {
        this.rides = res.results
        this.currentRidesToShow = res.results;
        if (res.results.length > 3) {
          this.currentRidesToShow = res.results.slice(0,3);
        }
        if (res.results.length === 0) {
          this.snackBar.open("System didn't find any past rides.", "", {
            duration: 2000,
         });
        }
        this.getRatings();
        this.setFavorites();
      },
      error: (error: any) => {
        this.rides = [];
        this.currentRidesToShow = [];
        this.snackBar.open("Driver does not exist!", "", {
          duration: 2000,
       });      } 
    });
  }

  getRatings() {
    this.ratings = [];
    this.currentRatingsToShow = [];
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
          this.ratings.push(0);
          if (sum != 0) {
            this.ratings.pop();
            this.ratings.push(sum/counter);
          }
          this.currentRatingsToShow = this.ratings;
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
        this.currentFavoriteRoutesToShow = this.favoriteRoutes;
        this.currentIsFavoriteRoutesToShow = this.isfavoriteRoutes;
      },
      error: (error: any) => {
        this.isfavoriteRoutes = new Array(this.rides.length).fill(false);
        this.favoriteRoutes = new Array(this.rides.length).fill(this.emptyFavorite);
        this.currentFavoriteRoutesToShow = this.favoriteRoutes;
        this.currentIsFavoriteRoutesToShow = this.isfavoriteRoutes;
      } 
    });
  }


  removeRoute(index: number): void {
    this.favoriteRouteService.removeFavoriteRoute(this.currentFavoriteRoutesToShow[index].id, this._id).subscribe({
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
      distance: this.currentRidesToShow[index].distance,
      departure: this.currentRidesToShow[index].locations[0].departure,
      destination: this.currentRidesToShow[index].locations[0].destination
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

  setDropDownContent(option: String) {
    this.selectedType = option;

    if(option === 'Date') {
      this.rides = this.rides.sort((a, b) => (a.startTime < b.startTime) ? -1 : 1)
    } else if (option === 'Price') {
      this.rides = this.rides.sort((a, b) => (a.totalCost < b.totalCost) ? -1 : 1)
    } else {
      this.rides = this.rides.sort((a, b) => (a.distance < b.distance) ? -1 : 1)
    }
    this.getRatings();
    this.setFavorites();
    this.currentRidesToShow = this.rides;
    if (this.rides.length > 3) {
      this.currentRidesToShow = this.rides.slice(0,3);
      this.currentIsFavoriteRoutesToShow = this.isfavoriteRoutes.slice(0,3);
      this.currentRatingsToShow = this.ratings.slice(0,3);
    }
  }

  openDetails(index: number): void {
    this.rideService.setRide(this.currentRidesToShow[index]);
    this.router.navigate(['ride-history-details']);
  }


}
