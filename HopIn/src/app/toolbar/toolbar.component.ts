import { WorkingHours, WorkingHoursService } from './../services/working-hours.service';
import { AuthService } from './../services/auth.service';
import { Component, ComponentFactoryResolver, EventEmitter, NgModuleRef,  OnInit, Output } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

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
    console.log('stanjeeeeeeeeeeeeee: ' + this.checked) 
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
    this.workingHoursService.startCounting(this.authService.getId()).subscribe((res) => {
      this.workingHours = res;
      this.checked = true;
      console.log(this.workingHours);
    }); 
  }

  setInactive(): void {
    this.workingHoursService.endCounting(this.workingHours.id).subscribe((res) => {
      this.workingHours = res;
      this.checked = false;
      console.log(this.workingHours);
    });
  }

}
