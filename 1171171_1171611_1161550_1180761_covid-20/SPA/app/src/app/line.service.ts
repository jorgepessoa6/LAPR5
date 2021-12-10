import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Config } from './config';

interface ILineDTO {
  name: string;
  firstNode: string;
  lastNode: string;
  color: string;
}

@Injectable({
  providedIn: 'root',
})
export class LineService {
  private postURL = Config.mdrURL + '/api/line/post';
  private getAllByNameURL = Config.mdrURL + '/api/line/listarNome';
  private filterName = Config.mdrURL + '/api/line/filtrarNome/';
  private getAllByNameNodeURL = Config.mdrURL + '/api/node/listarNome';

  constructor(private httpClient: HttpClient) {}

  addLine(nameInput: string, firstNodeInput: string, lastNodeInput: string, colorInput: string): Observable<any> {
    let lineDTO: ILineDTO = { name: nameInput, firstNode: firstNodeInput, lastNode: lastNodeInput, color: colorInput};

    return this.httpClient.post(this.postURL, lineDTO).pipe(map(this.responseBack));
  }

  getLines(): Observable<any> {
    return this.httpClient.get(this.getAllByNameURL).pipe(map(this.responseBack));
  }

  filterLines(nameInput: string): Observable<any> {
    return this.httpClient.get(this.filterName + nameInput).pipe(map(this.responseBack));
  }

  getNodes(): Observable<any> {
    return this.httpClient.get(this.getAllByNameNodeURL).pipe(map(this.responseBack));
  }

  private responseBack(res: Response) {
    return res || {};
  }




  
}
