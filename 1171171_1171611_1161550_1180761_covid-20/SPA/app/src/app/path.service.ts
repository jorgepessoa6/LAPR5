import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse ,} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PathNode } from './path/pathNode';
import { Direction } from './path/direction'
import { Config } from './config';

interface IPathDTO {
    idLinha: string;
    linePathID: string;
    orientation: Direction;
    key: string;
    isEmpty: boolean;
    pathNodes: Array<PathNode>;
}

@Injectable({
  providedIn: 'root'
})

export class PathService {


  private postURL = Config.mdrURL +  '/api/path/post';
  private getAllByNameURL = Config.mdrURL + '/api/line/listarNome';
  private filterName = Config.mdrURL + '/api/line/filtrarNome/';
  private listPaths = Config.mdrURL + '/api/path/listarPercursosLinha/';
  private listAllPaths = Config.mdrURL + '/api/path/listarTodosPercursos';
  private getAllByNameNodeURL = Config.mdrURL + '/api/node/listarNome';
  private filterNameNode = Config.mdrURL + '/api/node/filtrarNome/';

  constructor(private httpClient: HttpClient) { }

  getLines(): Observable<any> {
    return this.httpClient.get(this.getAllByNameURL).pipe(map(this.responseBack));
  }

  
  filterLines(nameInput: string): Observable<any> {
    return this.httpClient.get(this.filterName + nameInput).pipe(map(this.responseBack));
  }

  getPaths(nameInput: string): Observable<any> {
    return this.httpClient.get(this.listPaths+nameInput).pipe(map(this.responseBack));
  }

  getAllPaths(): Observable<any> {
    return this.httpClient.get(this.listAllPaths).pipe(map(this.responseBack));
  }

  addPath(idLinhaInput: string, linePathIDInput: string,nameInput: string,orientationInput: Direction,isEmptyInput:boolean, pathNodesInput:Array<PathNode>): Observable<any> {
    let pathDTO: IPathDTO = { idLinha: idLinhaInput,linePathID: linePathIDInput, orientation: orientationInput,key: nameInput,isEmpty: isEmptyInput, pathNodes: pathNodesInput};

    return this.httpClient.post(this.postURL, pathDTO).pipe(map(this.responseBack));
  }

  getNodes(): Observable<any> {
    return this.httpClient.get(this.getAllByNameNodeURL).pipe(map(this.responseBack));
  }

  filterNodes(nameInput: string): Observable<any> {
    return this.httpClient.get(this.filterNameNode + nameInput).pipe(map(this.responseBack));
  }

  private responseBack(res: Response) {
    return res || {};
  }

}
