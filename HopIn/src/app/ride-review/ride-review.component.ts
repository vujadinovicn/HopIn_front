import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ReviewDTO, RideReviewService } from '../services/ride-review.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-ride-review',
  templateUrl: './ride-review.component.html',
  styleUrls: ['./ride-review.component.css']
})
export class RideReviewComponent implements OnInit {

  driverRating: any = 0;
  vehicleRating: any = 0;
  reviews: ReviewDTO[] = [];

  constructor(private rideReview: RideReviewService,
    private sharedService: SharedService) { }

  reviewForm = new FormGroup({
    driverReviewComment: new FormControl('', [Validators.required]),
    vehicleReviewComment: new FormControl('', [Validators.required]),
  }, [])

  ngOnInit(): void {
  }

  submit(){
    if (this.reviewForm.valid) {
      this.reviews.push(this.setDriverReviewResponseFromForm());
      this.reviews.push(this.setVehicleReviewResponseFromForm());
      this.submitCompleteReview();
    } else {
        this.sharedService.openInvalidInputSnack();
    }
  }

  private submitCompleteReview() {
    this.rideReview.addCompleteReview(this.reviews, 1).subscribe({
      next: (res) => {
        this.sharedService.openSnack({
          value: "You've successfully submitted reviews!",
          color: "back-green"
        }
        );
        //this.dialogRef.close();
      },
      error: (error) => {
        this.sharedService.openSnack({
          value: error,
          color: "back-red"
        })
      }
    });
  }

  setVehicleReviewResponseFromForm(): ReviewDTO{
    return {
      rating: 4,
      comment: this.reviewForm.value.vehicleReviewComment!
    }
  }

  setDriverReviewResponseFromForm(): ReviewDTO{
    return {
      rating: 3,
      comment: this.reviewForm.value.driverReviewComment!
    }
  }
}
