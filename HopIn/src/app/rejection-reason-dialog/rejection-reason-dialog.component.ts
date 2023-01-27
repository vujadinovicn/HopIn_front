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

  rejectionReasonForm = new FormGroup({
    reason: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<ReejctionReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rideService: RideService)
    { }

  ngOnInit(): void {
  }

  submitRejectionReason() {
    this.rejectionReasonForm.updateValueAndValidity();
    if (this.rejectionReasonForm.valid) {
      let reason: ReasonDTO = {
        reason: this.rejectionReasonForm.value.reason!
      }
      this.rideService.declineRide(this.data.rideId, reason).subscribe();
      this.dialogRef.close();
      this.data.parent.close();
      console.log("POSLATO");
    }
  }

}
