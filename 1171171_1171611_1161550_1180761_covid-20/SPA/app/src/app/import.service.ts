import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private postURL = Config.mdrURL + '/api/fileImport/upload ';
  private postURLMDV =Config.mdvURL +" /api/Import";

  constructor(private httpClient: HttpClient) { }

  importXML(myFile: any): Observable<any> {
    let formData = new FormData();
    let formData2 = new FormData();
    formData.append('xml', myFile.files[0]);
    formData2.append('file', myFile.files[0]);
    this.httpClient.post<any>(this.postURL, formData).pipe(map(this.responseBack));
    return this.httpClient.post<any>(this.postURLMDV, formData2).pipe(map(this.responseBack));
  }   
  private responseBack(res: Response) {
    return res || {};
  }

}
