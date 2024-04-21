import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-arrived-dialog',
  templateUrl: './vehicle-arrived-dialog.component.html',
  styleUrls: ['./vehicle-arrived-dialog.component.css']
})
export class VehicleArrivedDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VehicleArrivedDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

}
