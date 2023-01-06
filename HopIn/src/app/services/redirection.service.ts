import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root',
  })
export class RedirectionService {

    constructor(private router: Router) {}

    openHome(role: string) {
        if (role === 'ROLE_PASSENGER') {
          this.router.navigate(['order-ride'])
        } else {
    
          if (role === 'ROLE_DRIVER') {
            this.router.navigate(['home-driver'])
          }
          else {
            if (role === 'ROLE_ADMIN') {
              this.router.navigate(['home-admin'])
            }
          }
        }
      }
}