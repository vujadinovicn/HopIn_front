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
  id: number = 0;


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
      this.id = res.id;
    });
  }

  
  acceptRequest(){
    this.requestDetailsService.acceptRequest(this.id).subscribe({
      next: (res: any) => {
        this.sharedService.openResponseSnack();
        window.location.reload();
      },
      error: (error: any) => {
          this.sharedService.openNoResponseSnack();
      }});
  }

  openDeclineReasonPopUp(){
    this.dialog.open(DeclineRequestReasonDialogComponent, {
      data: {requestId: this.id}
    });
  }

}
