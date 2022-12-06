import { Component, ComponentFactoryResolver, NgModuleRef,  OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  role: any;

  constructor() { 
    this.role = null;

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

}
