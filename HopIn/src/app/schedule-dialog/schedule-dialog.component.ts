import { Router } from '@angular/router';
import { RoutingService, ShortAddress } from './../services/routing.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { schedulingValidator } from '../validators/schedulingValidator';
import { timeFormatValidator } from '../validators/timeFormatValidator';

@Component({
  selector: 'app-schedule-dialog',
  templateUrl: './schedule-dialog.component.html',
  styleUrls: ['./schedule-dialog.component.css']
})
export class ScheduleDialogComponent implements OnInit {

  rideForm = new FormGroup({
    time: new FormControl('', [timeFormatValidator, schedulingValidator()]),
  });

  constructor(public dialogRef: MatDialogRef<ScheduleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private routingService: RoutingService,
    private router: Router) { }

  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }

  next(): void {
    let pickUpLoc: ShortAddress = {
      address: this.data.pickUp.address,
      longitude: this.data.pickUp.longitude,
      latitude: this.data.pickUp.latitude
    }
    let destLoc: ShortAddress = {
      address: this.data.dest.address,
      longitude: this.data.dest.longitude,
      latitude: this.data.dest.latitude
    }
    if (this.rideForm.valid) {
      this.routingService.route.scheduledTime = this.rideForm.get('time')?.value!;
      this.routingService.route.pickup = pickUpLoc;
      this.routingService.route.destination = destLoc;
      this.routingService.isFromHistory = true;

      this.router.navigate(['order-ride'])
      this.dialogRef.close();
    } else {this.dialogRef.close();}
  }

}
