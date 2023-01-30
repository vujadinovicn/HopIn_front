import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ride-canceled-dialog',
  templateUrl: './ride-canceled-dialog.component.html',
  styleUrls: ['./ride-canceled-dialog.component.css']
})
export class RideCanceledDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RideCanceledDialogComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }
}
