import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-document-image-dialog',
  templateUrl: './document-image-dialog.component.html',
  styleUrls: ['./document-image-dialog.component.css']
})
export class DocumentImageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DocumentImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
