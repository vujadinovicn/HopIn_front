import { Router } from '@angular/router';
import { RideReviewComponent } from './../ride-review/ride-review.component';
import { PanicReasonDialogComponent } from './../panic-reason-dialog/panic-reason-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SocketService } from './../services/socket.service';
import { Subscription } from 'rxjs';
import { SharedService } from './../shared/shared.service';
import { AuthService } from './../services/auth.service';
import { RatingsCardComponent } from './../ratings-card/ratings-card.component';
import { RideService, RideReturnedDTO } from './../services/ride.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit {

  ride: RideReturnedDTO = {} as RideReturnedDTO;
  role: string;
  atPickup: boolean = true;
  started: boolean = false;
  @ViewChild('timer') private timer: any;

  constructor(private rideService: RideService,
              public authService: AuthService,
              public sharedService: SharedService,
              public socketService: SocketService,
              private dialog: MatDialog,
              private router: Router) {
    this.role = authService.getRole();  
    
  }

  ngOnInit(): void {
    this.rideService.getRide().subscribe((ride) => {
      this.ride = ride;
    });

    if (this.authService.getRole() == "ROLE_PASSENGER") {
      this.socketService.subscribeRideStartFinish(this.ride.driver.id);
      this.socketService.receivedStartFinishResponse().subscribe((res: string) => {
          if (res == "start") {
            this.started = true;
            console.log("STARTED");
          } else {
            if (res == "finish") {
              this.timer.stop();
              console.log("FINISHED");
              this.socketService.unsubscribeFromStartFinishResponse();
              this.dialog.open(RideReviewComponent, {
                data: {rideId: this.ride.id}
              });
            }
          }
      });
    }
  }

  panicRide() {
    this.dialog.open(PanicReasonDialogComponent, {
      data: {rideId: this.ride.id}
    });
  }

  startRide() {
    this.rideService.startRide(this.ride.id).subscribe({
      next: (res) => {
        this.started = true;
        this.ride = res;
        this.sharedService.openSnack({
          value: "Ride started!",
          color: "back-green"
        });
      },
      error: (err) => {
        this.sharedService.openSnack({
          value: "Ride could not be started, error.",
          color: "back-red"
        });
      }
    });
  }

  endRide() {
    this.rideService.endRide(this.ride.id).subscribe({
      next: (res) => {
        this.timer.stop();
        this.ride = res;
        this.sharedService.openSnack({
          value: "Ride finished!",
          color: "back-green"
        });
        // alert("Ride finished successfully!");
        this.router.navigate([""]);
      },
      error: (err) => {
        this.sharedService.openSnack({
          value: "Ride could not be finished, error.",
          color: "back-red"
        });
      }
    });
  }

}
