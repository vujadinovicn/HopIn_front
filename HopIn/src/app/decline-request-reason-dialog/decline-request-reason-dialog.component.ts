import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-decline-request-reason-dialog',
  templateUrl: './decline-request-reason-dialog.component.html',
  styleUrls: ['./decline-request-reason-dialog.component.css']
})
export class DeclineRequestReasonDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeclineRequestReasonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private requestDetailsService : RequestDetailsService,
    private sharedService : SharedService
  ) {}

  reason: string = "";

  ngOnInit(): void {
  }

  declineRequest(): void {
    this.requestDetailsService.declineRequest(this.data.requestId, this.reason).subscribe({
      next: (res: any) => {
        this.sharedService.openResponseSnack();
      },
      error: (error: any) => {
          this.sharedService.openNoResponseSnack();
      }});
    this.dialogRef.close();
  }

}
