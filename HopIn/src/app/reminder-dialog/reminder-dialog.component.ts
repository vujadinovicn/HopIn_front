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
  destination: string = "Jiricekova 1, Novi Sad";
  estimatedTime: string = "17:03:25";

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    //this.role = this.authService.getRole();
  }

  start(){
    //TODO
  }

  close() {
    // this.dialogRef.close();
  }
}

