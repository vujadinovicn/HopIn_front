import { AuthService } from './../services/auth.service';
import { ReviewService, CompleteRideReviewDTO } from './../services/review.service';
import { RideService, RideReturnedDTO } from './../services/ride.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'ride-history',
  templateUrl: './ride-history.component.html',
  styleUrls: ['./ride-history.component.css']
})
export class RideHistoryComponent implements OnInit {

  _role: String = ''
  _id: number = 0
  rating = 4
  rides!: RideReturnedDTO[]
  ratings!: number[]


  constructor(private rideService: RideService,
    private reviewService: ReviewService,
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
        console.log(this.rides);
        console.log(this.ratings);
      },
      error: (error: any) => {
        console.log(error)
      } 
    });
  }

  getRatings() {
    this.ratings = [];
    for (let ride of this.rides) {
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
          this.ratings.push(sum);
          if (sum != 0) {
            this.ratings.pop();
            this.ratings.push(sum/counter);
          }
        },
        error: (error: any) => {
          //console.log(error)
        } 
      });
    }
    
  }


}
