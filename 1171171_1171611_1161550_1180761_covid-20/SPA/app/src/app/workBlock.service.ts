import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { workBlockDTO } from './workBlock/workBlockDTO';
import { Trip } from './trip/Trip';
import { TripService } from './trip.service';
import { PassingTime } from './trip/PassingTime';
import { Config } from './config';

@Injectable({
  providedIn: 'root'
})

export class WorkBlockService {

  constructor(private httpClient: HttpClient) { }


  private getWorkBlockURL = Config.mdvURL + '/api/WorkBlock/all';
  private postURL = Config.mdvURL + '/api/WorkBlock';
  private tripService = new TripService(this.httpClient);


  private responseBack(res: Response) {
    return res || {};
  }

  addWorkBlock(key: number,trips: Trip[], secondsMax: number, numeroMaximo: number, passingTimes: PassingTime[][]) {
    var secondsTemp = secondsMax;
    var workBlock = [];
    var tripsTemp = [];
    var isCrewTravelTime = false;
    var isActive = true;
    var startTime;
    var startNode;
    var endNode = null;
    var endTime = null;
    var first = true;
    for (var i = 0; i < trips.length; i++) {
        var passingTimesQ = passingTimes[i];
        for (var j = 0; j < passingTimesQ.length; j++) {
          var passingTime = passingTimesQ[j];
          if (passingTime != null) {
            if (workBlock.length < numeroMaximo) {
              if (passingTime.isUsed === false) {
                if (first === true) {
                  passingTime.isUsed = true;
                  startTime = passingTime.time;
                  secondsTemp = Number(secondsTemp) + Number(startTime);
                  startNode = passingTime.node;
                }

                if (secondsTemp >= passingTime.time && first === false) {
                  passingTime.isUsed = true;
                  endNode = passingTime.node;
                  endTime = passingTime.time;
                  if(!(tripsTemp.includes(trips[i]))){
                    tripsTemp.push(trips[i]);
                  }
                } else {
                  first = false;
                  if(!(endNode === null && endTime === null)){
                  var keyW = 'WorkBlock: ' + (Number(key));

                  key = (Number(key) + Number(1));
                  var ids = Array<string>();
                  tripsTemp.forEach(element => {
                    ids.push(element.id);
                  });
                  let workBlockDTO: workBlockDTO = {key: keyW, startTime: startTime, endTime: endTime, startNode: startNode, endNode: endNode, isCrewTravelTime: isCrewTravelTime, isActive: isActive, trips: ids };
                  workBlock.push(workBlockDTO);
                  secondsTemp = secondsMax;
                  tripsTemp = [];
                  j--;
                  secondsTemp = Number(secondsTemp) + Number(endTime);
                  startNode = endNode;
                  startTime = endTime;
                  endNode = null;
                  endTime = null;
                }
              }
              }
            }
          }
        }
      
    }
    if(tripsTemp != [] && workBlock.length < numeroMaximo && endNode != null && endTime != null){
      var keyW = 'WorkBlock: ' + (Number(key));

      key = (Number(key) + Number(1));
      let workBlockDTO: workBlockDTO = { key: keyW, startTime: startTime, endTime: endTime, startNode: startNode, endNode: endNode, isCrewTravelTime: isCrewTravelTime, isActive: isActive, trips: ids };
      workBlock.push(workBlockDTO); 
    }
    var ids = Array<string>();
    tripsTemp.forEach(element => {
      ids.push(element.id);
    });
    console.log(workBlock)
    return this.httpClient.post(this.postURL, workBlock).pipe(map(this.responseBack));
  }
  getTripsWithoutWorkBlock(): Observable<any> {
    return this.tripService.getTripsWithoutWorkBlock();
  }

  getPassingTimes(tripId: string): Promise<any> {
    return this.tripService.getPassingTimes(tripId);
  }

  getAllWorkBlocks(): Promise<any> {
    return this.httpClient.get(this.getWorkBlockURL).toPromise();
  }
}