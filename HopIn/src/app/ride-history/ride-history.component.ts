import { ScheduleDialogComponent } from './../schedule-dialog/schedule-dialog.component';
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
import { Route, RoutingService, ShortAddress } from '../services/routing.service';
import { MatDialog } from '@angular/material/dialog';
import { RideReviewComponent } from '../ride-review/ride-review.component';
@Component({
  selector: 'ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {

  route: Route = {} as Route;
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
  selectedType: String = 'Sort';
  notRated: boolean[] = [];

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
    private routingService: RoutingService,
    private dialog: MatDialog) {
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

  checkIfPassengerReviewedRide(reviews: any, index: number){
    if (this._role === 'ROLE_DRIVER')
      return;
    for (let review of reviews){
      if (review.vehicleReview.passenger.id == this._id){
        this.notRated[index] = false;
        return;
      }
    }
    this.notRated[index] = true;
  }

  haveThreeDaysPassedSinceEndOfRide(endTime: any){
    let result = new Date(endTime);
    result.setDate(result.getDate() + 3);
    console.log(result)
    console.log(new Date())
    return result < new Date()
  }

  getRatings() {
    console.log(this.rides);
    this.ratings = new Array(this.rides.length).fill(0);
    this.currentRatingsToShow = [];
    for (let i = 0; i < this.rides.length; i++) {
      this.reviewService.getAll(this.rides[i].id).subscribe({
        next: (res) => {
          if (this.haveThreeDaysPassedSinceEndOfRide(this.rides[i].endTime))
            this.notRated[i] = false;
          else 
            this.checkIfPassengerReviewedRide(res, i);
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
          if (sum != 0) {
            this.ratings[i] = Math.round(sum/counter);
          }
          this.currentRatingsToShow = this.ratings;
          console.log(this.currentRatingsToShow);
          
        },
        error: (error: any) => {
          console.log(error)
        } 
      });
    }
  }

  leaveRating(index: number){ 
    let dialog = this.dialog.open(RideReviewComponent, {
      data: {rideId: this.rides[index].id},
      width: 'fit-content',
      height : 'fit-content'
  })
  dialog.afterClosed().subscribe((result) => {
    if (result.success == true){
      (<HTMLInputElement> document.getElementById("btn"+index)).classList.add("disabled");
    }
  
  });

  } 

  setFavorites() {
    this.favoriteRouteService.getAll(this._id).subscribe({
      next: (res) => {
        this.isfavoriteRoutes = [];
        this.favoriteRoutes = [];
        for(let i = 0; i < this.rides.length; i++) {
          this.isfavoriteRoutes.push(false);
          this.favoriteRoutes.push(this.emptyFavorite);
          for (let route of res) {
            if (route.departure.latitude == this.rides[i].locations[0].departure.latitude && route.departure.longitude == this.rides[i].locations[0].departure.longitude) {
              if (route.destination.latitude == this.rides[i].locations[0].destination.latitude && route.destination.longitude == this.rides[i].locations[0].destination.longitude) {
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
      this.rides = this.rides.sort((a, b) => (a.startTime <= b.startTime) ? -1 : 1)
    } else if (option === 'Price') {
      this.rides = this.rides.sort((a, b) => (a.totalCost <= b.totalCost) ? -1 : 1)
    } else {
      this.rides = this.rides.sort((a, b) => (a.distance <= b.distance) ? -1 : 1)
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
    let ride: RideReturnedDTO = this.currentRidesToShow[index];
    let pickUp: ShortAddress = {
      address: ride.locations[0].departure.address.toString(),
      longitude: ride.locations[0].departure.longitude,
      latitude: ride.locations[0].departure.latitude
    }

    let dest: ShortAddress = {
      address: ride.locations[0].destination.address.toString(),
      longitude: ride.locations[0].destination.longitude,
      latitude: ride.locations[0].destination.latitude
    }
    this.route.pickup = pickUp;
    this.route.destination = dest;
    this.route.vehicleTypeName = "CAR";
    this.routingService.updateRoute(this.route);
    this.routingService.findRoute();
    this.router.navigate(['/ride-history-details']);

  }

  openDialog(index: number): void {
    if (this._role != 'ROLE_PASSENGER') {return;}
    const dialogRef = this.dialog.open(ScheduleDialogComponent, {
      data: {pickUp: this.currentRidesToShow[index].locations[0].departure,
             dest: this.currentRidesToShow[index].locations[0].destination}
    });

    dialogRef.afterClosed().subscribe(result => {
      dialogRef.close();
    });
  }

  parseLocation(location: string): string {
    try {
    return location.split(",")[0]+", "+location.split(",")[1].replace(/[0-9]/g, '');
    } catch {
      return location;
    }
  }

  parseDate(date: string): string {
    let d = date.split("T")[0];
    let t = date.split("T")[1].split(".")[0]
    return d.split("-")[2] + "-" + d.split("-")[1] + "-" + d.split("-")[0] + " at " + t;
  }


}
