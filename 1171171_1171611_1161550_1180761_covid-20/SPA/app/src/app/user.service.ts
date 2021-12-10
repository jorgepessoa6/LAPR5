import { Injectable } from '@angular/core';    
import { HttpClient } from '@angular/common/http';    
import { map } from 'rxjs/operators';    
import { Config } from './config';
import { User1 } from './user-home/User';

interface IUserDTO {
  userName: string;
}
    
@Injectable({    
  providedIn: 'root'    
})    

export class UserService {    
    
  private myAppUrl = Config.mdvURL +'/api';
  private deleteUserUrl = Config.mdvURL +'/api/register/deleteUser/';      
    
  constructor(private http: HttpClient) {    
  }    
    
  getUserData() {    
    return this.http.get(this.myAppUrl+'/user/GetUserData').pipe(map(result => result));    
  }    
    
  getAdminData() {    
    return this.http.get(this.myAppUrl+'/user/GetAdminData').pipe(map(result => result));    
  }
  
  deleteUser(userData : User1){
    console.log(userData);
    return this.http.delete(this.deleteUserUrl + userData.userName);
  }
}    