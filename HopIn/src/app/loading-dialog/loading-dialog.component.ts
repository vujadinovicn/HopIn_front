import { RideService } from './../services/ride.service';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { RoutingService } from './../services/routing.service';
import { SocketService, RideOfferResponseDTO } from './../services/socket.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouteService } from '../services/route.service';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {

  status: string = "pending";

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
        this.status = "accepted";
        setTimeout(() => 
        {
          this.dialogRef.close();
          this.rideService.setRide(res.ride);
          this.router.navigate(['current-ride']);
        },
        5000);
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
          console.log("Error creating ride... " + err);
        }
      });
    }
  }

}
