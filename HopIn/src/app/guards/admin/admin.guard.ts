import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.isLoggedIn() && this.authService.getRole() == "ROLE_PASSENGER") {
      this.router.navigate(['order-ride']);
      return false;
    }
    else if (this.authService.isLoggedIn() && this.authService.getRole() == "ROLE_DRIVER") {
      this.router.navigate(['home-driver']);
      return false;
    }
    else if (!this.authService.isLoggedIn()){
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  
}
