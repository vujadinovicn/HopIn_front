import { SharedService } from './../shared/shared.service';
import { RideReturnedDTO, RideService } from './../services/ride.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reminder-dialog',
  templateUrl: './reminder-dialog.component.html',
  styleUrls: ['./reminder-dialog.component.css']
})
export class ReminderDialogComponent implements OnInit {

  role: string = "passenger";
  ride: RideReturnedDTO;

  constructor(private authService: AuthService,
              private dialogRef: MatDialogRef<ReminderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private rideService: RideService,
              private router: Router,
              private sharedService: SharedService) 
  {
      this.role = this.authService.getRole();
      this.ride = this.data.ride;
  }

  ngOnInit(): void {
    
  }

  start(){
    this.rideService.startRideToDeparture(this.ride.id).subscribe({
      next: (res) => {
        console.log(res);
        this.rideService.setRide(res);
        this.sharedService.openSnack({
          value: "Moving to scheduled ride departure!",
          color: "back-green"
        });
        
        this.router.navigate(['current-ride']);
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let minutes = date.getMinutes() + "";
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    return date.getHours() + ":" + minutes + ", " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
  }
}

