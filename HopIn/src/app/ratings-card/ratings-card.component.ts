import { UserService } from './../services/user.service';
import { Review, ReviewService } from './../services/review.service';
import { RideService } from './../services/ride.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CompleteRideReviewDTO } from '../services/review.service';
import { RideReturnedDTO } from '../services/ride.service';
import { User } from '../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ratings-card',
  templateUrl: './ratings-card.component.html',
  styleUrls: ['./ratings-card.component.css']
})
export class RatingsCardComponent implements OnInit {

  ride!: RideReturnedDTO;
  reviews: Review[] = [];
  passengers: User[] = [];
  reviewInfo: ReviewInfo = {
    isDriver: false,
    comment: '',
    rating: 0
  }

  constructor(private rideService: RideService,
    private reviewService: ReviewService,
    private userService: UserService,
    public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialog, {
      width: '250px',
      data: this.reviewInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(this.reviewInfo);
    });
  }

}


@Component({
  selector: 'review-dialog',
  templateUrl: 'review-dialog.html',
  styleUrls: ['./review-dialog.css']
})
export class ReviewDialog {

  c: string = ''

  constructor(
    public dialogRef: MatDialogRef<ReviewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ReviewInfo) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export interface ReviewInfo {
  isDriver: boolean,
  comment: string,
  rating: number
}
