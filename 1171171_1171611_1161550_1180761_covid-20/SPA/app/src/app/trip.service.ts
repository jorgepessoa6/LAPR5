import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { PassingTime } from './trip/PassingTime';
import { Direction } from './path/direction';
import { Path } from './path/path';
import { NodeService } from './node.service';
import { Node } from './node/Node';
import { LineService } from './line.service';
import { Line } from './line/linha';
import { Trip } from './trip/Trip';
import { Config } from './config';

interface ITripDTO {
  key: string;
  isEmpty: Boolean;
  orientation: Direction;
  lineKey: string;
  path: string;
  isGenerated: boolean;
  passingTime: PassingTime[];

}

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private postURL = Config.mdvURL + '/api/Trip';
  private postAdHocURL = Config.mdvURL + '/api/Trip/AdHoc';
  private getTripsURL = Config.mdvURL + '/api/Trip/all';

  private getTripsOfLineURL =  Config.mdvURL+ '/api/Trip/all/';
  private getTripsWithoutWorkBlockURL = Config.mdvURL + '/api/Trip/tripsWithoutWorkBlock';


  private getAllByNameURL = Config.mdrURL + '/api/line/listarNome';
  private listPaths = Config.mdrURL + '/api/path/listarPercursosLinha/';
  private listLinePaths = Config.mdrURL + '/api/path/listarLinePathsByLine/';
  private getAllByNameNodeURL = Config.mdrURL + '/api/node/listarNome';
  private getPassingTimesURL = Config.mdvURL + '/api/Trip/getPassingTimes/';
  node: any;
  trips: any;
  line: Line;
  private nodeService = new NodeService(this.httpClient);

  constructor(private httpClient: HttpClient) { }

  addTripAdHoc(
    tripKey: number,
    lineName: string,
    beginHour: string,
    selectedPath: any
  ): Observable<any> {
    var passingTimes = new Array<PassingTime>();
    var sum: number;
    sum = 0;
    var count: number;
    count = 0;

    var direction: Direction;
    var seconds = this.toSeconds(beginHour);

    //Create all the passing times
    if (selectedPath != null) {
      var pathNode = selectedPath[0].pathNodes[0].pathNode;
      for (let index = 0; index < pathNode.length; index++) {
        if (pathNode[index].duration != undefined) {
          sum = Number(sum) + Number(pathNode[index].duration);
        }
        var time = Number(seconds + sum);
        var key = pathNode[index].node;

        this.node = this.nodeService
          .filterNodesByKey(key)
          .then((result) => (this.node = result));

        let passingTimeDTO: PassingTime = {
          time: time,
          node: key,
          isUsed: false,
          isReliefPoint: this.node.isReliefPoint,
        };
        passingTimes.push(passingTimeDTO);
      }
    }

    var tripName = 'Trip: ' + (Number(tripKey) + Number(1));

    tripKey = Number(tripKey) + Number(1);

    var isEmpty: any;
    var pathkey: any;

    if (selectedPath != null) {
      isEmpty = selectedPath[0].isEmpty;
      pathkey = selectedPath[0].key;
    } else {
      isEmpty = true;
      pathkey = 1;
    }

    let tripDTO: ITripDTO = {
      key: tripName,
      isEmpty: isEmpty,
      orientation: direction,
      lineKey: lineName,
      path: pathkey,
      isGenerated: false,
      passingTime: passingTimes
    };

    return this.httpClient
      .post(this.postAdHocURL, tripDTO)
      .pipe(map(this.responseBack));
  }

  addTrips(
    tripKey: number,
    lineName: string,
    beginHour: string,
    frequency: number,
    numberOfTrips: number,
    goPath: any,
    returnPath: any
  ): Observable<any> {
    var passingTimes = new Array<PassingTime>();
    var sum: number;
    sum = 0;
    var count: number;
    count = 0;
    var currentPath: any;
    var direction: Direction;
    var tripDTOs = new Array<ITripDTO>();
    var seconds = this.toSeconds(beginHour);

    //Choose Type of Path depending on the index of the number of the Trip
    for (let index = 0; index < numberOfTrips; index++) {
      if ((index + 1) % 2 == 0) {
        currentPath = returnPath;
        direction = Direction.Return;
      } else {
        currentPath = goPath;
        direction = Direction.Go;
        if (index + 1 > 1) {
          sum = (index - 1 - count) * (frequency * 60);
          count++;
        }
      }

      //Create all the passing times
      if (currentPath != null) {
        var pathNode = currentPath.pathNodes[0].pathNode;
        for (let index = 0; index < pathNode.length; index++) {
          if (pathNode[index].duration != undefined) {
            sum = Number(sum) + Number(pathNode[index].duration);
          }
          var time = Number(seconds + sum);
          var key = pathNode[index].node;

          this.node = this.nodeService
            .filterNodesByKey(key)
            .then((result) => (this.node = result));

          let passingTimeDTO: PassingTime = {
            time: time,
            node: key,
            isUsed: false,
            isReliefPoint: this.node.isReliefPoint,
          };
          console.log(passingTimeDTO);
          passingTimes.push(passingTimeDTO);
        }
      }

      var tripName = 'Trip: ' + (Number(tripKey) + Number(1));

      tripKey = Number(tripKey) + Number(1);

      var isEmpty: any;
      var pathkey: any;

      if (currentPath != null) {
        isEmpty = currentPath.isEmpty
        pathkey = currentPath.key

      } else {
        isEmpty = true;
        pathkey = 1;
      }
      let tripDTO: ITripDTO = {
        key: tripName,
        isEmpty: isEmpty,
        orientation: direction,
        lineKey: lineName,
        path: pathkey,
        isGenerated: true,
        passingTime: passingTimes,
        };
      console.log(tripDTO);
      tripDTOs.push(tripDTO);

      var passingTimes = new Array<PassingTime>();
    }
    console.log(tripDTOs);
    return this.httpClient
      .post(this.postURL, tripDTOs)
      .pipe(map(this.responseBack));
  }

  toSeconds(hour: string): number {
    var a = hour.split(':'); // split it at the colons
    // minutes are worth 60 seconds. Hours are worth 60 minutes.
    var seconds = Number(+a[0]) * 60 * 60 + +a[1] * 60 + +a[2];

    return seconds;
  }

  getTripsOfLine(line: string): Observable<any> {
    console.log(line);
    return this.httpClient
      .get(this.getTripsOfLineURL + line)
      .pipe(map(this.responseBack));
  }

  getAllTrips(): Promise<any> {
    return this.httpClient.get(this.getTripsURL).toPromise();
  }

  getTrips(): Observable<any> {
    return this.httpClient
      .get(this.getAllByNameURL)
      .pipe(map(this.responseBack));
  }

  getLines(): Observable<any> {
    return this.httpClient
      .get(this.getAllByNameURL)
      .pipe(map(this.responseBack));
  }

  getPaths(nameInput: string): Observable<any> {
    return this.httpClient
      .get(this.listPaths + nameInput)
      .pipe(map(this.responseBack));
  }

  getLinePaths(nameInput: string): Observable<any> {
    return this.httpClient
      .get(this.listLinePaths + nameInput)
      .pipe(map(this.responseBack));
  }

  getNodes(): Observable<any> {
    return this.httpClient
      .get(this.getAllByNameNodeURL)
      .pipe(map(this.responseBack));
  }

  getTripsWithoutWorkBlock(): Observable<any> {
    return this.httpClient
      .get(this.getTripsWithoutWorkBlockURL)
      .pipe(map(this.responseBack));
  }
  getPassingTimes(tripId: string): Promise<any> {
    return this.httpClient.get(this.getPassingTimesURL + tripId).toPromise();
  }

  private responseBack(res: Response) {
    return res || {};
  }
}
