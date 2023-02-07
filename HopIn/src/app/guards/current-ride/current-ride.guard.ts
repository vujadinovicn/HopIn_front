import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RideReturnedDTO } from 'src/app/services/ride.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentRideGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.getRole() == "ROLE_ADMIN") {
      this.router.navigate(['admin-home']);
      return false;
    }
    else if (!this.authService.isLoggedIn()){
      this.router.navigate(['']);
      return false;
    } else {
      // if (localStorage.getItem('current_ride') != null){
      //   let ride = JSON.parse(localStorage.getItem('current_ride')!) as RideReturnedDTO;
      //   if (this.authService.getRole() == "ROLE_DRIVER" && ride.driver.id == this.authService.getId())
      //     return true;
      //   else if (this.authService.getRole() == "ROLE_PASSENGER"){
      //     for (let passenger of ride.passengers){
      //       if (passenger.id == this.authService.getId())
      //         return true;
      //     }
      //   }
      // }
      return true;
    }
    if (this.authService.getRole() == "ROLE_DRIVER")
      this.router.navigate(['home-driver']);
    else 
      this.router.navigate(['order-ride']);
    return false;
  }
  
}
