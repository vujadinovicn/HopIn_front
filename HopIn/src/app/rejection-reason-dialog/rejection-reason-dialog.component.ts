import { Router } from '@angular/router';
import { SharedService } from './../shared/shared.service';
import { RideService, ReasonDTO } from './../services/ride.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reejction-reason-dialog',
  templateUrl: './rejection-reason-dialog.component.html',
  styleUrls: ['./rejection-reason-dialog.component.css']
})
export class ReejctionReasonDialogComponent implements OnInit {

  isCurrentRide = false;

  rejectionReasonForm = new FormGroup({
    reason: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ReejctionReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rideService: RideService,
    private sharedService: SharedService,
    private router: Router)
    { }

  ngOnInit(): void {
    if (this.data.currentRide) {
      this.isCurrentRide = true;
    }
  }

  submitRejectionReason() {
    this.rejectionReasonForm.updateValueAndValidity();
    if (this.rejectionReasonForm.valid) {
      let reason: ReasonDTO = {
        reason: this.rejectionReasonForm.value.reason!
      }
      this.rideService.declineRide(this.data.rideId, reason).subscribe();
      this.dialogRef.close();
      if (this.data.currentRide != null && this.data.currentRide) {
        this.resetLocalStorage();
        this.router.navigate(['']);
      } else {
        this.data.parent.close();
      }
      
      this.sharedService.openSnack({
        value: "Ride canceled successfully!",
        color: "back-green"
      });
      console.log("POSLATO");
    }
  }

  resetLocalStorage() {
    localStorage.removeItem('current_ride_started');
    localStorage.removeItem('current_ride');
  }

}
