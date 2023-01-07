import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeclineRequestReasonDialogComponent } from '../decline-request-reason-dialog/decline-request-reason-dialog.component';
import { AuthService } from '../services/auth.service';
import { RequestDetailsService } from '../services/requestDetails.service';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-admin-request-details-container',
  templateUrl: './admin-request-details-container.component.html',
  styleUrls: ['./admin-request-details-container.component.css']
})
export class AdminRequestDetailsContainerComponent implements OnInit {

  role: string = "driver";
  requestId: number = 0;
  adminId : number = 0;

  isRequestSelected: boolean = false;
  status: String = 'PENDING';


  constructor(private dialog: MatDialog,
    private authService: AuthService,
    private requestDetailsService: RequestDetailsService,
    private sharedService : SharedService) {
    }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      this.adminId = this.authService.getId();
    })
    this.recieveRequest();
  }

  recieveRequest(): void {
    this.requestDetailsService.recieveIsRequestSelected().subscribe((res) => { 
      this.isRequestSelected = res;
    });

    this.requestDetailsService.recieveRequest().subscribe((res) => { 
      this.status = res.status;
      this.requestId = res.id;
    });
  }

  
  acceptRequest(){
    this.requestDetailsService.acceptRequest(this.requestId, this.adminId).subscribe({
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
      data: {requestId: this.requestId}
    });
  }

}
