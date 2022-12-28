import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeclineRequestReasonDialogComponent } from '../decline-request-reason-dialog/decline-request-reason-dialog.component';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-admin-request-details-container',
  templateUrl: './admin-request-details-container.component.html',
  styleUrls: ['./admin-request-details-container.component.css']
})
export class AdminRequestDetailsContainerComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private requestDetailsService: RequestDetailsService,
    private sharedService : SharedService,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  valueFromChild : number = 0;

  forwardRequestId(valueFromChild: number) {
    this.valueFromChild = valueFromChild;
  }
  
  acceptRequest(){
    this.requestDetailsService.acceptRequest(this.valueFromChild).subscribe({
      next: (res: any) => {
        this.snackBar.open("Response is in console!", "", {
          duration: 2000,
          panelClass: ["back-green"]
        });      },
      error: (error: any) => {
          this.snackBar.open("Haven't got data back!", "", {
            duration: 2000,
            panelClass: ["back-dark-blue"]
          });
      }});
  }

  openDeclineReasonPopUp(){
    this.dialog.open(DeclineRequestReasonDialogComponent, {
      data: {requestId: this.valueFromChild}
    });
  }

}
