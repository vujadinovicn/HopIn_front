import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    private sharedService: SharedService,
    private dialogRef: MatDialogRef<RideReviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    this.rideReview.addCompleteReview(this.reviews, this.data.rideId).subscribe({
      next: (res) => {
        this.sharedService.openSnack({
          value: "You've successfully submitted reviews!",
          color: "back-green"
        }
        );
        this.dialogRef.close();
      },
      error: (error) => {
        this.sharedService.openSnack({
          value: error,
          color: "back-red"
        })
      }
    });
  }

  setDriverReviewResponseFromForm(): ReviewDTO{
    return {
      rating: this.driverRating,
      comment: this.reviewForm.value.driverReviewComment!
    }
  }

  setVehicleReviewResponseFromForm(): ReviewDTO{
    return {
      rating: this.vehicleRating,
      comment: this.reviewForm.value.vehicleReviewComment!
    }
  }
}
