import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';
import { Population } from './generations/Population';


interface IGenerationDTO {
  populations: Population[];
}

@Injectable({
  providedIn: 'root',
})

export class GenerationsService {
  private postURL = Config.planeamentoURL + '/planeamentoTripulantes';
  private getPopulationsURL = Config.mdvURL + '/api/Generation/allPopulations';
  private getGenerationsURL = Config.mdvURL + '/api/Generation/all';
  private postAddURL = Config.mdvURL + '/api/Generation';

  constructor(private httpClient: HttpClient) {}

  sendRequest(VD: number, NG: number, DP: number, P1: number, P2: number, P3: number,  TT: number, AMIN: number, STABVAL: number): Observable<any> {
    let url = this.postURL.concat('?nvd=' + Number(VD) +'&ngeracoes=' + Number(NG) + '&dpopulacao=' + Number(DP) + '&pcruzamento=' + Number(P1) +
    '&pmutacao=' + Number(P2) + '&ppassagem=' + Number(P3) + '&tlim=' + Number(TT) + '&amin=' + Number(AMIN) + '&stabval=' + Number(STABVAL));
    return this.httpClient.post(url, null);
  }

  
  addGeneration(pop:  Population[]): Observable<any> {
    let generationDTO: IGenerationDTO = { populations: pop};

    return this.httpClient.post(this.postAddURL, generationDTO).pipe(map(this.responseBack));
  }
  
  getAllGenerations(): Observable<any> {
    return this.httpClient.get(this.getGenerationsURL).pipe(map(this.responseBack));
  }

  getPopulations(): Observable<any> {
    return this.httpClient.get(this.getPopulationsURL).pipe(map(this.responseBack));
  }

  private responseBack(res: Response) {
    return res || {};
  }
}
