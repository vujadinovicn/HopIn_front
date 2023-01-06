import { RedirectionService } from './../services/redirection.service';
import { SharedService } from './../shared/shared.service';
import { AuthService } from './../services/auth.service';
import { Component, ComponentFactoryResolver, NgModuleRef,  OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  role: any;

  constructor(private authService: AuthService,
    private router: Router, private redirectionService: RedirectionService) { 
    this.authService.getUser().subscribe((res) => {
      this.role = res;
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

  logout(): void {
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

  openHome(role: string) {
    this.redirectionService.openHome(role);
  }

}
