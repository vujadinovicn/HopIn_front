import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReasonDTO, RideService } from '../services/ride.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-panic-reason-dialog',
  templateUrl: './panic-reason-dialog.component.html',
  styleUrls: ['./panic-reason-dialog.component.css']
})
export class PanicReasonDialogComponent implements OnInit {

  panicReasonForm = new FormGroup({
    reason: new FormControl('', [Validators.required])
  });

  constructor(public dialogRef: MatDialogRef<PanicReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rideService: RideService,
    private sharedService: SharedService)
    { }

  ngOnInit(): void {
  }

  submitPanicReason() {
    this.panicReasonForm.updateValueAndValidity();
    if (this.panicReasonForm.valid) {
      let reason: ReasonDTO = {
        reason: this.panicReasonForm.value.reason!
      }
      this.rideService.panicRide(this.data.rideId, reason).subscribe();
      this.dialogRef.close();
      this.sharedService.openSnack({
        value: "Panic notification sent to support. Hang in there!",
        color: "back-green"
      });
    }
  }

}
