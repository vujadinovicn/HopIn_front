import { UserService } from './../services/user.service';
import { Review, ReviewService } from './../services/review.service';
import { RideService } from './../services/ride.service';
import { Component, OnInit } from '@angular/core';
import { CompleteRideReviewDTO } from '../services/review.service';
import { RideReturnedDTO } from '../services/ride.service';
import { User } from '../services/user.service';

@Component({
  selector: 'app-ratings-card',
  templateUrl: './ratings-card.component.html',
  styleUrls: ['./ratings-card.component.css']
})
export class RatingsCardComponent implements OnInit {

  rating: number = 3;
  ride!: RideReturnedDTO;
  reviews: Review[] = [];
  passengers: User[] = [];

  constructor(private rideService: RideService,
    private reviewService: ReviewService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
      this.reviewService.getAll(this.ride.id).subscribe((r) => {
        this.reviews = [];
        this.passengers = [];
        for(let doubleReview of r) {
          if (doubleReview.vehicleReview!=null) {
            this.reviews.push(doubleReview.vehicleReview);
            this.getPassenger(doubleReview.vehicleReview)
          }
          if (doubleReview.driverReview!=null) {
            this.reviews.push(doubleReview.driverReview);
            this.getPassenger(doubleReview.driverReview)

          }
        }
      })
    })
  }

  getPassenger(review: Review): void {
    this.userService.getByPassengerId(review.passenger.id).subscribe((res) => {
      this.passengers.push(res);
    })
  }

}
