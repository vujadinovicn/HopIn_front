import { UserService } from './../services/user.service';
import { Review, ReviewDTO, ReviewService } from './../services/review.service';
import { RideService } from './../services/ride.service';
import { Component, Inject, OnInit } from '@angular/core';
import { CompleteRideReviewDTO } from '../services/review.service';
import { RideReturnedDTO } from '../services/ride.service';
import { User } from '../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-ratings-card',
  templateUrl: './ratings-card.component.html',
  styleUrls: ['./ratings-card.component.css']
})
export class RatingsCardComponent implements OnInit {

  ride!: RideReturnedDTO;
  _role: String = '';
  reviews: Review[] = [];
  passengers: User[] = [];
  reviewInfo: ReviewInfo = {
    isDriver: false,
    comment: '',
    rating: 0,
    isActionSave: false
  }

  constructor(private rideService: RideService,
    private reviewService: ReviewService,
    private userService: UserService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this._role = res;
    })

    this.rideService.getRide().subscribe((res) => {
      this.ride = res;
      this.reviewService.getAll(this.ride.id).subscribe((r) => {
        this.reviews = [];
        this.passengers = [];
        let index = 0;
        for(let doubleReview of r) {
          if (doubleReview.vehicleReview!=null) {
            this.reviews.push(doubleReview.vehicleReview);
            index += 1;
            this.getPassenger(doubleReview.vehicleReview, index-1)
          }
          if (doubleReview.driverReview!=null) {
            this.reviews.push(doubleReview.driverReview);
            index += 1;
            this.getPassenger(doubleReview.driverReview, index-1)
          }
        }
        console.log(this.reviews);
        console.log(this.passengers);
      })
    })
  }

  getPassenger(review: Review, index: number): void {
    this.userService.getByPassengerId(review.passenger.id).subscribe((res) => {
      this.passengers.splice(index, 0, res);
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ReviewDialog, {
      width: '250px',
      data: this.reviewInfo
    });

    dialogRef.afterClosed().subscribe(result => {
      if(this.reviewInfo.isActionSave) {
        let rev: ReviewDTO = {comment: this.reviewInfo.comment, rating: this.reviewInfo.rating}
        if (this.reviewInfo.isDriver) {
          this.reviewService.saveDriverReview(rev, this.ride.id).subscribe((res: Review) => {
            //this.getPassenger(res);
            this.reviews.push(res);
          });
        } else {
          this.reviewService.saveVehicleReview(rev, this.ride.id).subscribe((res: Review) => {
            //this.getPassenger(res);
            this.reviews.push(res);
          });
        }
      }

      this.reviewInfo = {
        isDriver: false,
        comment: '',
        rating: 0,
        isActionSave: false
      }
      dialogRef.close();
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
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: ReviewInfo) {}

  onNoClick(): void {
    this.data.isActionSave = false;
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.data.comment == '' || this.data.rating == 0) {
      this.snackBar.open("Leave a comment or a rating.", "", {
        duration: 2000,
     });
     return;
    }
    this.data.isActionSave = true;
    this.dialogRef.close();
  }

}

export interface ReviewInfo {
  isDriver: boolean,
  comment: string,
  rating: number,
  isActionSave: boolean 
}
