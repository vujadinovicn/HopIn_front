import { RideReturnedDTO } from './../services/ride.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';

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
              @Inject(MAT_DIALOG_DATA) public data: any) 
  {
      this.role = this.authService.getRole();
      this.ride = this.data.ride;
  }

  ngOnInit(): void {
    
  }

  start(){
    //TODO
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

