import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';

interface IDefineDriverDTO {
  NrMecano: string;
  Nome: string;
  DataNascimento: Date;
  CC: Number;
  NIF: Number;
  TipoTripulante: string[];
  DataEntrada: Date;
  DataSaida: Date;
  DataCartaConducao: Date;
  NrCartaConducao: Number;
}


@Injectable({
  providedIn: 'root'
})

export class DefineDriverService {

  private postURL = Config.mdvURL + '/api/defineDriver';
  private getAllByNameDriverURL = Config.mdrURL + '/api/driver/listarNome';

  constructor(private httpClient: HttpClient) { }


  addDefineDriver(NrMecanoInput: string, NomeInput: string, DataNascimentoInput: Date, CCInput: Number, NIFInput: Number,
    TipoTripulanteInput:string[],DataEntradaInput: Date, DataSaidaInput:Date,
    DataCartaConducaoInput:Date, NrCartaConducaoInput:Number): Observable<any> {
    let defineDriverDTO: IDefineDriverDTO = {NrMecano: NrMecanoInput,Nome: NomeInput,DataNascimento: DataNascimentoInput,CC:CCInput,
    NIF:NIFInput,TipoTripulante:TipoTripulanteInput,DataEntrada:DataEntradaInput,
    DataSaida:DataSaidaInput, DataCartaConducao:DataCartaConducaoInput,NrCartaConducao:NrCartaConducaoInput };

    console.log(defineDriverDTO);
    return this.httpClient.post(this.postURL, defineDriverDTO).pipe(map(this.responseBack));
  }

  getDriver(): Observable<any> {
    return this.httpClient.get(this.getAllByNameDriverURL).pipe(map(this.responseBack));
  }
  private responseBack(res: Response) {
    return res || {};
  }


}
