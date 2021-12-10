import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';

interface IDriverDTO {
  name: string;
  description: string;
}


@Injectable({
  providedIn: 'root'
})

export class DriverService {


  private postURL = Config.mdrURL + '/api/driver/post';

  constructor(private httpClient: HttpClient) { }


  addDriver(nameInput: string, descriptionInput: string): Observable<any> {
    let driverDTO: IDriverDTO = {name: nameInput,description: descriptionInput};

    return this.httpClient.post(this.postURL, driverDTO).pipe(map(this.responseBack));
  }

  private responseBack(res: Response) {
    return res || {};
  }


}
