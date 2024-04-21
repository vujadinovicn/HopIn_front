import { RideService, RideReturnedDTO } from './../services/ride.service';
import { PanicService } from './../services/panic.service';
import { UserService } from './../services/user.service';
import { Panic, SocketService } from './../services/socket.service';
import { Message } from 'stompjs';
import { WorkingHours, WorkingHoursService } from './../services/working-hours.service';
import { RedirectionService } from './../services/redirection.service';
import { SharedService } from './../shared/shared.service';
import { AuthService } from './../services/auth.service';
import { Component, ComponentFactoryResolver, EventEmitter, NgModuleRef,  OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {map, Subscription, timer} from 'rxjs';  
import { DisplayedPanic } from '../admin-home/admin-home.component';
import {Howl, Howler} from 'howler';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  timerSubscription!: Subscription; 
  role: any;
  checked: boolean = false;
  workingHours: WorkingHours = {
    id: 0,
    start: '',
    end: ''
  }
  currentDate: Date = new Date();
  workedMiliSecs: number = 0;
  panics: DisplayedPanic[] = [];
  hasNew: boolean = false;
  isCurrentRide: boolean = false;

  constructor(private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private workingHoursService: WorkingHoursService,
    private socketService: SocketService,
    private userService: UserService,
    private panicService: PanicService,
     private redirectionService: RedirectionService,
     private rideService: RideService) { 
    this.authService.getUser().subscribe((res) => {
      this.role = res;
    })
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      if (this.role === 'ROLE_DRIVER') {
        this.setActive();
        this.checked = true;
      }
    })
    this.panicService.receivedHasNew().subscribe((res) => {
      this.hasNew = res;
    })
    this.panics = [];
    this.handleSmallScreens();
    this.subscribeToPanic();

    this.rideService.getRide().subscribe((res: RideReturnedDTO) =>{
      if (res != null) {
        if (res.status == "ACCEPTED" || res.status == "STARTED") {
          this.isCurrentRide = true;
        } else {
          this.isCurrentRide = false;
        }

      }
    }
    );
  }

  testInterval() {
    console.log("caoooo")
  }

  handleSmallScreens(): void {
    (<HTMLButtonElement>document.querySelector('.navbar-toggler'))
      .addEventListener('click', () => {
      let navbarMenu = <HTMLDivElement>document.querySelector('.navbar-menu')
  
      if (navbarMenu.style.display === 'flex') {
        navbarMenu.style.display = 'none'
        return 
      }
  
      navbarMenu.style.display = 'flex'
    })
  }

  public toggleChange(): void {
    !this.checked;
    if (this.checked == true) {
      this.setActive();    
    } else {
      this.setInactive();
    }
    
  }

  logout(): void {
    if (this.role === 'ROLE_DRIVER' && this.checked === true) {
      this.setInactive();
      this.checked = false;
    }
    localStorage.removeItem('user');
    this.resetLocalStorage();
    //DODATI OSTALE
    this.socketService.unsubscribeFromPanic();
    this.socketService.closeWebSocketConnection();

    this.authService.setUser();
    this.router.navigate(['login']);
  }

  resetLocalStorage() {
    localStorage.removeItem('current_ride_started');
    localStorage.removeItem('current_ride');
  }

  openAccount(): void {
    if (this.role === 'ROLE_DRIVER') {
      this.router.navigate(['account-driver'])
    } else {
      this.router.navigate(['account-passenger'])
    }
  }

  openAdminHome(): void {
    this.hasNew = false;
    this.panicService.updateHasNew(this.hasNew);
    this.router.navigate(['/admin-home']);
  }

  setActive(): void {
    this.workingHoursService.startCounting(this.authService.getId()).subscribe({
      next: (res: any) => {
        this.workingHours = res;
        // console.log(this.workingHours);
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
       });
        if (error.error.message != 'Shift already ongoing!') {
          this.checked = false;
        }
      }
    });
    
    
    
  }

  setInactive(): void {
    this.workingHoursService.endCounting(this.workingHours.id).subscribe({
      next: (res: any) => {
        this.workingHours = res;
        let end = new Date(this.workingHours.end);
        let start = new Date(this.workingHours.start);
        let diff = end.valueOf() - start.valueOf();
        this.workedMiliSecs = this.workedMiliSecs + diff;
      },
      error: (error: any) => {
        this.snackBar.open(error.error.message, "", {
          duration: 2000,
       });
       this.checked = true;
      }
    });
  }


  // PANIC METHODS
  subscribeToPanic(): void {
    this.socketService.receivedPanic().subscribe((res) => {
        if (res.user.role === 'DRIVER') {
          this.addDriverPanic(res);
        } else {
          this.addPassengerPanic(res);
        }
        this.hasNew = true;
        this.panicService.updateHasNew(this.hasNew);
        if (this.role === 'ROLE_ADMIN') {
          let sound = new Howl({
            src: ['../../assets/audio/mixkit-wrong-answer-fail-notification-946.wav']
          });
          sound.play();
          this.snackBar.open("Someone pressed panic button!", "", {
            duration: 2000,
        });
      }
    })
  }

  addPassengerPanic(panic: Panic): void {
    this.userService.getByDriverId(panic.ride.driver.id).subscribe((res) => {
      let picDriver = res.profilePicture;
      if (picDriver == null) {picDriver="../../assets/images/profile-placeholder.png";}
      let picUser = panic.user.profilePictue;
      if (picUser == null) {picUser="../../assets/images/profile-placeholder.png";}
      let newPanic: DisplayedPanic = {
        rideId: panic.ride.id,
        isDriver: false,
        callerName: panic.user.name,
        callerSurName: panic.user.surname,
        callerProfilePicture: picUser,
        driverName: res.name,
        driverSurname: res.surname,
        driverProfilePicture: picDriver,
        model: res.model,
        plates: res.licenseNumber,
        time: this.formatDate(panic.time),
        reason: panic.reason
      }
      this.panics.push(newPanic);
      this.panicService.updatePanic(this.panics);
    })
  }

  addDriverPanic(panic: Panic): void {
    this.userService.getByDriverId(panic.ride.driver.id).subscribe((res) => {
      let pic = res.profilePicture;
      if (pic == null) {pic="../../assets/images/profile-placeholder.png";}
      let newPanic: DisplayedPanic = {
        rideId: panic.ride.id,
        isDriver: true,
        callerName: panic.user.name,
        callerSurName: panic.user.surname,
        callerProfilePicture: pic,
        driverName: '',
        driverSurname: '',
        driverProfilePicture: '',
        model: res.model,
        plates: res.licenseNumber,
        time: this.formatDate(panic.time),
        reason: panic.reason
      }
      this.panics.push(newPanic);
      this.panicService.updatePanic(this.panics);
    })
  }

  public formatDate(dateStr: string): string {
    let date = new Date(dateStr);
    return "at " + date.getHours() + ":" + date.getMinutes() + ", " + date.getDate() + "." + date.getMonth() + "." + date.getFullYear();
  }
  
  openHome(role: string) {
    this.redirectionService.openHome(role);
  }

  openCurrentRide() {
    this.router.navigate(['current-ride']);
  }

}
