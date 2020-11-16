import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// Services
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( private userService: UserService,
                private router: Router ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
      // return this.userService.role === 'ADMIN_ROLE' ? true : false;
      if (this.userService.role === 'ADMIN_ROLE') {
        return true;
      } else {
        this.userService.logout();
        this.router.navigateByUrl('/login');
        return false;
      };
  }
  
}
