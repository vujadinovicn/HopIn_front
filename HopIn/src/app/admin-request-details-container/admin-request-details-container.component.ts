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

  _role: String;
  isRequestSelected: boolean = false;
  status: String = 'PENDING';


  constructor(private dialog: MatDialog,
    private requestDetailsService: RequestDetailsService,
    private sharedService : SharedService) {
      this._role = requestDetailsService.role;
    }

  ngOnInit(): void {
    this.recieveRequest();
  }

  recieveRequest(): void {
    this.requestDetailsService.recieveIsRequestSelected().subscribe((res) => { 
      this.isRequestSelected = res;
    });

    this.requestDetailsService.recieveRequest().subscribe((res) => { 
      this.status = res.status;
      console.log(this.status)
    });
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
