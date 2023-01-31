import { ScheduledRideAcceptedComponent } from './../scheduled-ride-accepted/scheduled-ride-accepted.component';
import { SharedService } from './../shared/shared.service';
import { Router } from '@angular/router';
import { ReejctionReasonDialogComponent } from './../rejection-reason-dialog/rejection-reason-dialog.component';
import { RideService } from './../services/ride.service';
import { Route, RoutingService } from './../services/routing.service';
import { AuthService } from './../services/auth.service';
import { SocketService } from './../services/socket.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {

  public route: Route = {} as Route;
  public role: string = "";

  constructor(
    private dialog: MatDialog,
    private socketService: SocketService,
    private authService: AuthService,
    private routingService: RoutingService,
    private rideService: RideService,
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    private router: Router,
    private sharedService: SharedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    dialogRef.disableClose = true;

    if (this.authService.getRole() == "ROLE_PASSENGER")
      this.route = this.data.invite.route;
    else
      this.route = this.routingService.toRoute(this.data.ride);

    this.role = authService.getRole();

    console.log(this.route);

  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  declineInvitation() {
    if (this.authService.getRole() == "ROLE_PASSENGER")
      this.socketService.sendInviteResponse({passengerId: this.authService.getId(), response: false}, this.data.invite.from.id);
    else {
      this.dialog.open(ReejctionReasonDialogComponent, {
        data: {rideId: this.data.ride.id, parent: this.dialogRef}
      });
    }
  }

  acceptInvitation() {
    console.log(this.data);
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      console.log("EVO ME OVAJ ID " + this.data.invite.route.passengers[0].id);
      this.socketService.sendInviteResponse({passengerId: this.authService.getId(), response: true}, this.data.invite.from.id);
      this.dialog.open(LoadingDialogComponent, {
        data: {userId: this.data.invite.route.passengers[0].id}
      });
    }
    else {
      console.log("POKUSAVAM DA POSALJEM ACCEPT SA IDEM " + this.data.ride.id);
      this.rideService.acceptRide(this.data.ride.id).subscribe({
        next: (res) => {
          this.dialogRef.close();
          if (res.scheduledTime == null) {
            this.rideService.setRide(res);
            this.router.navigate(['current-ride']);
          } else {
            this.dialog.open(ScheduledRideAcceptedComponent, {
              data: {scheduledTime: this.formatDate(res.scheduledTime)}
            });
          }
          
        },
        error: (err) => {
          this.sharedService.openSnack({
            value: "Error happend while trying to accept ride offer.",
            color: "back-red"
          });
        }
      });
    }
      
    this.close();
  }

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    date.setMonth(date.getMonth() + 1);
    return date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }

}
