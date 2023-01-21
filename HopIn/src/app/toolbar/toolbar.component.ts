import { Message } from 'stompjs';
import { WorkingHours, WorkingHoursService } from './../services/working-hours.service';
import { AuthService } from './../services/auth.service';
import { Component, ComponentFactoryResolver, EventEmitter, NgModuleRef,  OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import {map, Subscription, timer} from 'rxjs';  


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

  constructor(private authService: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    private workingHoursService: WorkingHoursService) { 
  }

  ngOnInit(): void {
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      if (this.role === 'ROLE_DRIVER') {
        this.setActive();
        this.checked = true;
      }
    })
    this.handleSmallScreens();
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
    if (this.checked === true) {
      this.setInactive();
      this.checked = false;
    }
    localStorage.removeItem('user');
    this.authService.setUser();
    this.router.navigate(['login']);
  }

  openAccount(): void {
    if (this.role === 'ROLE_DRIVER') {
      this.router.navigate(['account-driver'])
    } else {
      this.router.navigate(['account-passenger'])
    }
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
       this.checked = false;
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

}
