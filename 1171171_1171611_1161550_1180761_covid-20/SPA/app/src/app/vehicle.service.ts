import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { VehicleComponent } from './vehicle/vehicle.component';
import { Config } from './config';

interface IVehicleDTO {
  matricula: string;
  VIN: string;
  tipo: string;
  dataEntrada: Date;
}


@Injectable({
  providedIn: 'root'
})

export class VehicleService {


  private postURL = Config.mdvURL + '/api/Vehicle';
  private getAllByNameVehicleTypeURL = Config.mdrURL + '/api/vehicletype/listarNome';

  constructor(private httpClient: HttpClient) { }


  addVehicle(matriculaInput: string, VINInput: string, tipoInput: string, dataEntradaInput: Date): Observable<any> {
    let vehicleDTO: IVehicleDTO = {matricula: matriculaInput,VIN: VINInput,tipo: tipoInput,dataEntrada:dataEntradaInput };

    return this.httpClient.post(this.postURL, vehicleDTO).pipe(map(this.responseBack));
  }

  getVehicleType(): Observable<any> {
    return this.httpClient.get(this.getAllByNameVehicleTypeURL).pipe(map(this.responseBack));
  }
  private responseBack(res: Response) {
    return res || {};
  }


}
