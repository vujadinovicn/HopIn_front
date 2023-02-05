import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RideService } from 'src/app/services/ride.service';

@Injectable({
  providedIn: 'root'
})
export class RideHistoryDetailsGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router, private rideService: RideService) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authService.isLoggedIn()){
      this.router.navigate(['']);
      return false;
    } else{
      if (this.rideService.getRide() == null){
        if (this.authService.getRole() == "ROLE_PASSENGER")
          this.router.navigate(['order-ride'])
        else if (this.authService.getRole() == "ROLE_DRIVER")
          this.router.navigate(['home-driver'])
        else 
          this.router.navigate(['admin-home'])
        return false;
      }
    }
    return true;
  }
  
}

