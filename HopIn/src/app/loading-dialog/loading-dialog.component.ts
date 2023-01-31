import { RideService } from './../services/ride.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { RoutingService } from './../services/routing.service';
import { SocketService, RideOfferResponseDTO } from './../services/socket.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouteService } from '../services/route.service';
import { reduce } from 'rxjs';
import { MinutesFormatterPipe } from 'ngx-material-timepicker/src/app/material-timepicker/pipes/minutes-formatter.pipe';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

  status: string = "pending";
  scheduledTime: string = "";

  constructor(public dialogRef: MatDialogRef<LoadingDialogComponent>,
              private socketService: SocketService,
              private routingService: RoutingService,
              private routeService: RouteService,
              private authService: AuthService,
              private router: Router,
              private rideService: RideService,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.socketService.subscribeToRideOfferResponse(this.data.userId);

    this.socketService.receivedOfferResponse().subscribe((res: RideOfferResponseDTO) => {
      if (res.response) {
        console.log("ACCEPTED RIDE OFFER");
        this.handleAcceptedRide(res);
        
      }
      else {
        this.dialogRef.disableClose = false;
        console.log("DECLINED RIDE OFFER");
        this.status = "declined";   
        // setTimeout(() => 
        // {this.dialogRef.close()},
        // 3000);
      }
    })

    if (this.data.userId == this.authService.getId()) {
      this.routeService.createRide(this.routingService.route).subscribe({
        next: (res) => {
          
        },
        error: (err) => {
          this.status = "declined";
          console.log("Error creating ride... " + err);
        }
      });
    }
  }

  handleAcceptedRide(res: RideOfferResponseDTO) {
    if (res.ride.scheduledTime != null) {
          this.status = "scheduled";
          this.scheduledTime = this.formatDate(res.ride.scheduledTime);
    } else {
          this.status = "accepted";
          setTimeout(() => 
          {
            this.dialogRef.close();
            this.rideService.setRide(res.ride);
            this.router.navigate(['current-ride']);
          },
          3000);
    }
  }

  formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    let minutes = date.getMinutes() + "";
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    return date.getHours() + ":" + minutes + ", " + date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
  }

  close() {
    this.dialogRef.close();
  }
}
