import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User1 } from '../user-home/User';
import { UserRole } from '../user-home/UserRole';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {    
  isExpanded = false;    
  userDataSubscription: any;    
  userData = new User1();    
  userRole = UserRole;    
    
  constructor(private authService: AuthService) {    
    this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {    
      this.userData = data;
    });    
  }    
    
  collapse() {    
    this.isExpanded = false;    
  }    
    
  toggle() {    
    this.isExpanded = !this.isExpanded;    
  }    
    
  logout() {    
    this.authService.logout();    
  }    
}     