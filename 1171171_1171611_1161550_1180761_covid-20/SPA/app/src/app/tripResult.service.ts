import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';

interface ITripResultDTO {
    time: Number;
    noI: string;
    noF: string;
    caminho: Array<any>;
    finalTime: Number;
}

@Injectable({
  providedIn: 'root'
})

export class TripResultService {


  private listTripResultsURL = Config.mdrURL + '/api/results/listarTripResults';
  private getAllByNameURL = Config.mdrURL + '/api/node/listarNome';
  private postURL = Config.planeamentoURL + '/Astar';

  constructor(private httpClient: HttpClient) { }

  getTripResults(): Observable<any> {
    return this.httpClient.get(this.listTripResultsURL).pipe(map(this.responseBack));
  }

  getNodes(): Observable<any> {
    return this.httpClient.get(this.getAllByNameURL).pipe(map(this.responseBack));
  }
  postRequest(time: number, n1 :string, n2:string): Observable<any> {
    let url = this.postURL.concat('?timeI=' + Number(time) +'&n1=' + n1.toUpperCase() + '&n2=' + n2.toUpperCase());
    return this.httpClient.post(url, null);
  }



  private responseBack(res: Response) {
    return res || {};
  }

}
