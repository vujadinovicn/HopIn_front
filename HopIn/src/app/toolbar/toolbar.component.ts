import { Component, ComponentFactoryResolver, NgModuleRef,  OnInit } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  forLoggedOut: boolean = false;
  forLoggedIn: boolean = false;

  constructor(private resolver: ComponentFactoryResolver) { 
    const factory = resolver.resolveComponentFactory(ToolbarComponent);
    console.log(factory);

    const ngModuleRef: NgModuleRef<any> = (factory as any).ngModule;
    if (ngModuleRef.instance.constructor.name == "AppModule") {
      this.forLoggedOut = true;
    }

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
