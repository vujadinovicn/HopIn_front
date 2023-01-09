import { WorkingHours, WorkingHoursService } from './../services/working-hours.service';
import { AuthService } from './../services/auth.service';
import { Component, ComponentFactoryResolver, EventEmitter, NgModuleRef,  OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  role: any;
  checked: boolean = false;
  workingHours: WorkingHours = {
    id: 0,
    start: '',
    end: ''
  }

  constructor(private authService: AuthService,
    private router: Router,
    private workingHoursService: WorkingHoursService) { 
    this.authService.getUser().subscribe((res) => {
      this.role = res;
      if (this.role === 'ROLE_DRIVER') {
        this.checked = true;
        this.toggleChange();
      }
    })
  }

  ngOnInit(): void {
    this.handleSmallScreens();
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

  toggleChange(): void {
    !this.checked;

    console.log(this.checked)
    if (this.checked === true) {
      this.workingHoursService.startCounting(this.authService.getId()).subscribe((res) => {
        this.workingHours = res;
        console.log(this.workingHours);
      });    
    } else {
      this.workingHoursService.endCounting(this.workingHours.id).subscribe((res) => {
        this.workingHours = res;
        console.log(this.workingHours);
      });
    }

  }

  logout(): void {
    localStorage.removeItem('user');
    this.authService.setUser();
    if (this.checked === true) {
      this.workingHoursService.endCounting(this.workingHours.id).subscribe((res) => {
        this.workingHours = res;
        console.log(this.workingHours);
      });    
    }
    this.router.navigate(['login']);
  }

  openAccount(): void {
    if (this.role === 'ROLE_DRIVER') {
      this.router.navigate(['account-driver'])
    } else {
      this.router.navigate(['account-passenger'])
    }
  }

}
