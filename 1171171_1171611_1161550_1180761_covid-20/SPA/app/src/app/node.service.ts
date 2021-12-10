import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';

interface INodeDTO {
  key: string;
  name: string;
  latitude: number;
  longitude: number;
  shortName: string;
  isDepot: boolean;
  isReliefPoint: boolean;
}


@Injectable({
  providedIn: 'root'
})

export class NodeService {


  private postURL = Config.mdrURL + '/api/node/post';
  private getAllByNameURL = Config.mdrURL + '/api/node/listarNome';
  private filterName = Config.mdrURL + '/api/node/filtrarNome/';
  private filterKey = Config.mdrURL + '/api/node/filtrarKey/';

  constructor(private httpClient: HttpClient) { }


  addNode(keyInput:string, nameInput: string, latInput: number,lonInput: number,shortNameInput:string, isDepotInput: boolean, isReliefPointInput: boolean): Observable<any> {
    let nodeDTO: INodeDTO = { key: keyInput, name: nameInput, latitude: latInput, longitude: lonInput,shortName: shortNameInput, isDepot: isDepotInput,isReliefPoint:isReliefPointInput};

    return this.httpClient.post(this.postURL, nodeDTO).pipe(map(this.responseBack));
  }
  
  getNodes(): Observable<any> {
    return this.httpClient.get(this.getAllByNameURL).pipe(map(this.responseBack));
  }

  
  filterNodes(nameInput: string): Observable<any> {
    return this.httpClient.get(this.filterName + nameInput).pipe(map(this.responseBack));
  }

  filterNodesByKey(keyInput: string): Promise<any> {
    return this.httpClient.get(this.filterKey + keyInput).toPromise();
  }

  private responseBack(res: Response) {
    return res || {};
  }


}
