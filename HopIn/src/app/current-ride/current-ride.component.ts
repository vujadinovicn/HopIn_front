import { VehicleArrivedDialogComponent } from './../vehicle-arrived-dialog/vehicle-arrived-dialog.component';
import { Router } from '@angular/router';
import { RideReviewComponent } from './../ride-review/ride-review.component';
import { PanicReasonDialogComponent } from './../panic-reason-dialog/panic-reason-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SocketService, TimerDTO } from './../services/socket.service';
import { Subscription } from 'rxjs';
import { SharedService } from './../shared/shared.service';
import { AuthService } from './../services/auth.service';
import { RatingsCardComponent } from './../ratings-card/ratings-card.component';
import { RideService, RideReturnedDTO } from './../services/ride.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';

@Component({
  selector: 'app-current-ride',
  templateUrl: './current-ride.component.html',
  styleUrls: ['./current-ride.component.css']
})
export class CurrentRideComponent implements OnInit, OnDestroy {

  ride: RideReturnedDTO = {} as RideReturnedDTO;
  role: string;
  atPickup: boolean = true;
  started: boolean = false;
  @ViewChild('timer') private timer: any;
  timerStartTime = 0;

  arrivalTime: string = "";

  constructor(private rideService: RideService,
              public authService: AuthService,
              public sharedService: SharedService,
              public socketService: SocketService,
              private dialog: MatDialog,
              private router: Router) {
    this.role = authService.getRole();  
  }

  ngOnDestroy(): void {
    this.resetLocalStorage();
  }

  ngOnInit(): void {

    this.rideService.getRide().subscribe((ride) => {
      if (ride != null) {
        this.ride = ride;
        localStorage.setItem('current_ride', JSON.stringify(this.ride));
      }

      this.subscribeToStartFinish();
      this.subscribeToArrivalTime();
      this.subscribeToVehicleArrival();
      
    }); 
    if (localStorage.getItem('current_ride') != null) {
      this.rideService.setRide(JSON.parse(localStorage.getItem('current_ride')!) as RideReturnedDTO);
    }

    if (localStorage.getItem('current_ride_started') != null) {
      this.started = localStorage.getItem('current_ride_started')! == "true";
    }

    if (this.ride != null && this.started) {
      this.timerStartTime = Math.floor((Date.now() - Date.parse(this.ride.startTime))/1000);
    }
  }

  resetLocalStorage() {
    localStorage.removeItem('current_ride_started');
    localStorage.removeItem('current_ride');
  }

  subscribeToVehicleArrival() {
    this.socketService.subscribeToVehicleArrival(this.ride.id);
    this.socketService.receivedVehicleArrival().subscribe((res: string) => {
      this.arrivalTime = "arrived!";
      this.socketService.unsubscribeFromVehicleArrival();
      this.socketService.unsubscribeFromArrivalTime();
      if (this.authService.getRole() == "ROLE_PASSENGER")
        this.dialog.open(VehicleArrivedDialogComponent);
    });
  }

  subscribeToArrivalTime() {
    this.socketService.subscribeToArrivalTime(this.ride.id);
    this.socketService.receivedArrivalTime().subscribe((res: TimerDTO) => {
      this.arrivalTime = this.formatTime(res.timer);
    });
  }

  formatTime(timer: number): string {
    let timerr = Math.floor(timer);
    let minutes = Math.floor(timerr/60);
    let seconds = timerr - minutes*60;
    if (minutes > 0) {
      return minutes + "min" + " " + seconds + "s";
    } else {
      return seconds + "s";
    }
  }

  subscribeToStartFinish() {
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
        localStorage.setItem('current_ride_started', "true");
        this.ride = res;
        localStorage.setItem('current_ride', JSON.stringify(this.ride));
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

        this.socketService.unsubscribeFromStartFinishResponse();

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

