import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-document-details-dialog',
  templateUrl: './document-details-dialog.component.html',
  styleUrls: ['./document-details-dialog.component.css']
})
export class DocumentDetailsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DocumentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }
}
