import { Injectable } from '@angular/core';    
import { HttpClient } from '@angular/common/http';    
import { BehaviorSubject } from 'rxjs';    
import { map } from 'rxjs/operators';    
import { Router } from '@angular/router';    
import { User1 } from './user-home/User';    
import { Config } from './config';
  

interface RegistryDTO {
  userName: string;
  email:string;
  firstName: string;
  password: string;
  UserType: string;
}


@Injectable({    
  providedIn: 'root'    
})

export class AuthService {    
    
  userData = new BehaviorSubject<User1>(new User1());
  private postLoginURL = Config.mdvURL + '/api/login';
  private postRegisterURL = Config.mdvURL + '/api/register';     
    
  constructor(private http: HttpClient, private router: Router) { }    
    
  login(userDetails) {    
    let registryDTO: RegistryDTO = { userName: userDetails.username, email: "", firstName: "", password: userDetails.password, UserType: ""};
    return this.http.post<any>(this.postLoginURL, registryDTO)    
      .pipe(map(response => {    
        localStorage.setItem('authToken', response.token);    
        this.setUserDetails();    
        return response;    
      }));    
  }    
    
  setUserDetails() {    
    if (localStorage.getItem('authToken')) {    
      const userDetails = new User1();    
      const decodeUserDetails = JSON.parse(window.atob(localStorage.getItem('authToken').split('.')[1]));    
      userDetails.userName = decodeUserDetails.sub;    
      userDetails.firstName = decodeUserDetails.firstName;    
      userDetails.isLoggedIn = true;    
      userDetails.role = decodeUserDetails.role;    
    
      this.userData.next(userDetails);    
    }    
  }    
    
  logout() {    
    localStorage.removeItem('authToken');    
    this.router.navigate(['/login']);    
    this.userData.next(new User1());    
  }

  getUser(){
    return this.userData;
  }
  
  register(userName: string, email: string, firstName: string, password: string) {
    let registryDTO: RegistryDTO = { userName: userName, email: email, firstName: firstName, password: password, UserType: "User"}
    return this.http.post(this.postRegisterURL, registryDTO).pipe(map(this.responseBack));
  }
  
  private responseBack(res: Response) {
    return res || {};
  }
}    