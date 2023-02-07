import { RideCanceledDialogComponent } from './../ride-canceled-dialog/ride-canceled-dialog.component';
import { ReejctionReasonDialogComponent } from './../rejection-reason-dialog/rejection-reason-dialog.component';
import { CurrentRideSocketService } from './../services/current-ride-socket-service';
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
  parentComponent = "currentRide";

  arrivalTime: string = "";

  constructor(private rideService: RideService,
              public authService: AuthService,
              public sharedService: SharedService,
              public socketService: SocketService,
              private dialog: MatDialog,
              private router: Router,
              private crSocketService: CurrentRideSocketService) {
    this.role = authService.getRole();  
  }

  ngOnDestroy(): void {
    // this.resetLocalStorage();  
    
  }

  ngOnInit(): void {
    this.subscribeToArrivalTime();
    this.subscribeToVehicleArrival();
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      this.subscribeToStartFinish();
      this.subscribeToRideCanceled();
    }

    this.crSocketService.openWebSocketConnection();

    this.rideService.getRide().subscribe((ride) => {
      if (ride != null) {
        this.ride = ride;
        this.socketService.unsubscribeFromScheduledRide(this.ride.id);
        localStorage.setItem('current_ride', JSON.stringify(this.ride));
        this.crSocketService.openWebSocketConnection();
      }
      
    }); 
    if (localStorage.getItem('current_ride') != null) {
      this.rideService.setRide(JSON.parse(localStorage.getItem('current_ride')!) as RideReturnedDTO);
      this.ride = JSON.parse(localStorage.getItem('current_ride')!) as RideReturnedDTO;
      if (localStorage.getItem('current_ride_started') != null) {
        console.log("kako ovde")
        this.started = localStorage.getItem('current_ride_started')! == "true";
      }
  
      if (this.ride != null && this.started) {
        this.timerStartTime = Math.floor((Date.now() - Date.parse(this.ride.startTime))/1000);
      }
    }

    
  }

  subscribeToRideCanceled() {
    this.crSocketService.receivedRideCancel().subscribe((res: boolean) => {
      if (res) {
        this.dialog.open(RideCanceledDialogComponent);
        this.crSocketService.unsubscribeFromStartFinishResponse();
        this.crSocketService.unsubscribeFromVehicleArrival();
        this.crSocketService.unsubscribeFromArrivalTime();
        this.crSocketService.unsubscribeFromRideCancel();
        this.resetLocalStorage();
        this.router.navigate(['order-ride']);
      }
    })
  }

  resetLocalStorage() {
    localStorage.removeItem('current_ride_started');
    localStorage.removeItem('current_ride');
  }

  subscribeToVehicleArrival() {
    let sub = this.crSocketService.receivedVehicleArrival().subscribe((res: string) => {
      this.crSocketService.unsubscribeFromArrivalTime();
      this.arrivalTime = "arrived!";
      sub.unsubscribe();
      this.crSocketService.unsubscribeFromVehicleArrival();
      this.crSocketService.unsubscribeFromRideCancel();
      if (this.authService.getRole() == "ROLE_PASSENGER" && !this.started)
        this.dialog.open(VehicleArrivedDialogComponent);
    }); 
  }

  subscribeToArrivalTime() {
    this.crSocketService.receivedArrivalTime().subscribe((res: TimerDTO) => {
      console.log("TIMEEEEEEEEEEEEEEEEEEEEEEEEEEEEE");
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
      this.crSocketService.receivedStartFinishResponse().subscribe((res: RideReturnedDTO) => {
          if (res.status == "STARTED") {
            this.started = true;
            this.rideService.setRide(res);
            localStorage.setItem('current_ride_started', "true");
            localStorage.setItem('current_ride', JSON.stringify(res));
            console.log("STARTED");
          } else {
            if (res.status == "FINISHED") {
              this.timer.stop();
              console.log("FINISHED");
              this.rideService.setRide(res);
              this.crSocketService.unsubscribeFromStartFinishResponse();
              this.crSocketService.unsubscribeFromRideCancel();
              this.crSocketService.closeWebSocketConnection();
              this.resetLocalStorage();
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
        this.rideService.setRide(res);
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
        this.rideService.setRide(res);
        this.ride = res;
        this.sharedService.openSnack({
          value: "Ride finished!",
          color: "back-green"
        });

        this.crSocketService.unsubscribeFromStartFinishResponse();
        this.resetLocalStorage();
        // alert("Ride finished successfully!");
        this.router.navigate(["/home-driver"]);
      },
      error: (err) => { 
        this.sharedService.openSnack({
          value: "Ride could not be finished, error.",
          color: "back-red"
        });
      }
    });
  }

  cancelRide() {
    this.dialog.open(ReejctionReasonDialogComponent, {
      data: {
        rideId: this.ride.id,
        currentRide: true
      }
    });
  }

}

