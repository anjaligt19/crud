import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';



import { Observable } from 'rxjs';

import { UserService } from "./services/user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	 constructor(
    public userService: UserService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  	if (this.userService.isLoggedIn() !== true) {
      window.alert("Access not allowed!");
      this.router.navigate(['/'])
    }
    return true;
  }
  
}
