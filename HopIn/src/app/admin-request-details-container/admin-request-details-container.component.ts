import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeclineRequestReasonDialogComponent } from '../decline-request-reason-dialog/decline-request-reason-dialog.component';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-admin-request-details-container',
  templateUrl: './admin-request-details-container.component.html',
  styleUrls: ['./admin-request-details-container.component.css']
})
export class AdminRequestDetailsContainerComponent implements OnInit {

  _role: String = 'driver';

  constructor(private dialog: MatDialog,
    private requestDetailsService: RequestDetailsService,
    private sharedService : SharedService) { }

  ngOnInit(): void {
  }

  valueFromChild : number = 0;

  forwardRequestId(valueFromChild: number) {
    this.valueFromChild = valueFromChild;
  }
  
  acceptRequest(){
    this.requestDetailsService.acceptRequest(this.valueFromChild).subscribe({
      next: (res: any) => {
        this.sharedService.openResponseSnack();
      },
      error: (error: any) => {
          this.sharedService.openNoResponseSnack();
      }});
  }

  openDeclineReasonPopUp(){
    this.dialog.open(DeclineRequestReasonDialogComponent, {
      data: {requestId: this.valueFromChild}
    });
  }

}
