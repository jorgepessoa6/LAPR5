import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { User1 } from '../user-home/User';
import { UserRole } from '../user-home/UserRole';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  userDataSubscription: any;
  userData :any;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.setUserDetails();
    this.userData = this.authService.getUser();
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.userData.role === UserRole.Admin) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
