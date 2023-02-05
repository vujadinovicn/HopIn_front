import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-scheduled-ride-accepted',
  templateUrl: './scheduled-ride-accepted.component.html',
  styleUrls: ['./scheduled-ride-accepted.component.css']
})
export class ScheduledRideAcceptedComponent implements OnInit {

  scheduledTime: string = "";

  constructor(public dialogRef: MatDialogRef<ScheduledRideAcceptedComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.scheduledTime = this.data.scheduledTime;
  }

  close() {
    this.dialogRef.close();
  }

}
