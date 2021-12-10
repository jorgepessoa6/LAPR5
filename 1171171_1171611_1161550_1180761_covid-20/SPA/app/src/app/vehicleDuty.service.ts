import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { vehicleDutyDTO } from './vehicleDuty/vehicleDutyDTO';
import { WorkBlock } from './workBlock/workBlock';
import { workBlockDTO } from './workBlock/workBlockDTO';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})

export class VehicleDutyService {

  constructor(private httpClient: HttpClient) { }

  private postUrl = Config.mdvURL + '/api/VehicleDuty';
  private getWorkBlocksURL = Config.mdvURL + '/api/WorkBlock/all';
  private getConitguousWorkBlocksURL = Config.mdvURL + '/api/WorkBlock/contiguous/';
  private getVDutiesURL = Config.mdvURL  + '/api/VehicleDuty/all';

  private responseBack(res: Response) {
    return res || {};
  }
  

  getVDutyByDay(): Observable<any> {
     return this.httpClient.get(this.getVDutiesURL ).pipe(map(this.responseBack));
  }

  getContiguousWB(time: number): Observable<any> {
    console.log(time);
    return this.httpClient.get(this.getConitguousWorkBlocksURL + time).pipe(map(this.responseBack));
  }
  getAllWorkBlocks(): Observable<any> {
    return this.httpClient.get(this.getWorkBlocksURL).pipe(map(this.responseBack));
  }

  
  addVehicleDuty(code: string,wbInput:Array<any>,rgb:string): Observable<any> {
    let vehicleDutyDTO: vehicleDutyDTO = { code: code,lstWB: wbInput, rgb:rgb};
    console.log(vehicleDutyDTO);

    return this.httpClient.post(this.postUrl, vehicleDutyDTO).pipe(map(this.responseBack));
  }


}
