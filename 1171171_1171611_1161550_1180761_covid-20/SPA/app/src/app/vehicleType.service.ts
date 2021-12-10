import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';

interface IVehicleTypeDTO {
  //key: string;
  name: string;
  autonomy: number;
  cost: number;
  averageSpeed: number;
  energySource: number;
  consumption: number;
  emissions: number;
  //ParametersValues:  Array<any>;
  //Vehicles: Array<any>;
}


@Injectable({
  providedIn: 'root'
})

export class VehicleTypeService {


  private postURL = Config.mdrURL + '/api/vehicleType/post';

  constructor(private httpClient: HttpClient) { }


  addVehicleType(nameInput: string, autonomyInput: number, costInput: number,averageSpeedInput: number,
    energySourceInput: number, consumptionInput:number, emissionsInput: number): Observable<any> {
    let vehicleTypeDTO: IVehicleTypeDTO = {name: nameInput,autonomy: autonomyInput,cost: costInput,
    averageSpeed: averageSpeedInput, energySource:energySourceInput, consumption: consumptionInput, emissions:emissionsInput };

    return this.httpClient.post(this.postURL, vehicleTypeDTO).pipe(map(this.responseBack));
  }

  private responseBack(res: Response) {
    return res || {};
  }


}
