import { Message } from 'stompjs';
import { WorkingHours, WorkingHoursService } from './../services/working-hours.service';
import { AuthService } from './../services/auth.service';
import { Component, ComponentFactoryResolver, EventEmitter, NgModuleRef,  OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  subscription!: Subscription;
  role: any;
  checked: boolean = false;
  workingHours: WorkingHours = {
    id: 0,
    start: '',
    end: ''
  }
  currentDate: Date = new Date();
  workedSecunds: number = 0;

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
    // setInterval(this.checkShiftEnd, 1800);
    const source = interval(1800);
    this.subscription = source.subscribe(val => this.checkShiftEnd());
  }

  checkShiftEnd() {
    if (this.checked) {
      this.workedSecunds = this.workedSecunds + 2;
      console.log(this.workedSecunds);
      if (this.workedSecunds >= 28800) {
        this.setInactive();
      }
    }

    if ((new Date()).getDate != this.currentDate.getDate) {
      this.setInactive();
      this.currentDate = new Date();
      this.workedSecunds = 0;
      this.setActive();
    }
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
        this.snackBar.open(error.message, "", {
          duration: 2000,
       });
      }
    });
    
    
    
  }

  setInactive(): void {
    this.workingHoursService.endCounting(this.workingHours.id).subscribe({
      next: (res: any) => {
        this.workingHours = res;
        // console.log(this.workingHours);
      },
      error: (error: any) => {
        this.snackBar.open(error.Message, "", {
          duration: 2000,
       });
      }
    });
  }

}
