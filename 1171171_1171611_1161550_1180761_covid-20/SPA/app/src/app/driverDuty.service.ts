import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { driverDutyDTO } from './driverDuty/driverDutyDTO';
import { WorkBlock } from './workBlock/workBlock';
import { workBlockDTO } from './workBlock/workBlockDTO';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})

export class DriverDutyService {

  constructor(private httpClient: HttpClient) { }

  private postUrl = Config.mdvURL + '/api/DriverDuty';
  private getWorkBlocksURL = Config.mdvURL + '/api/WorkBlock/all';
  private getAllDD = Config.mdvURL + '/api/DriverDuty/all';
  private getConitguousWorkBlocksURL = Config.mdvURL + '/api/WorkBlock/contiguousOfVehicleService/';

  private responseBack(res: Response) {
    return res || {};
  }
  
  getContiguousWBofSameVehicleDuty(time: number, id:string): Observable<any> {
    console.log(time);
    return this.httpClient.get(this.getConitguousWorkBlocksURL + time + "&"+ id).pipe(map(this.responseBack));
  }
  getAllWorkBlocks(): Observable<any> {
    return this.httpClient.get(this.getWorkBlocksURL).pipe(map(this.responseBack));
  }

  
  addDiverDuty(code: string,wbInput:Array<any>,color:string): Observable<any> {
    let driverDutyDTO: driverDutyDTO = { code: code,lstWB: wbInput, color:color};
    console.log(driverDutyDTO);

    return this.httpClient.post(this.postUrl, driverDutyDTO).pipe(map(this.responseBack));
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.getAllDD).pipe(map(this.responseBack));
  }
}
