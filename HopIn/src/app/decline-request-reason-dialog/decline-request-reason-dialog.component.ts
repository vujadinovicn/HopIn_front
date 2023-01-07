import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
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
    private authService: AuthService,
    private requestDetailsService : RequestDetailsService,
    private sharedService : SharedService
  ) {}

  reason: string = "";
  adminId: number = 0;

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.adminId = this.authService.getId();
    })
  }

  declineRequest(): void {
    this.requestDetailsService.declineRequest(this.data.requestId, this.adminId, this.reason).subscribe({
      next: (res: any) => {
        this.sharedService.openResponseSnack();
        window.location.reload();
      },
      error: (error: any) => {
          this.sharedService.openNoResponseSnack();
      }});
    this.dialogRef.close();
  }

}
