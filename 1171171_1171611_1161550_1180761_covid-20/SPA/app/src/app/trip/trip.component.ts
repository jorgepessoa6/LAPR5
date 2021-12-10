import { Component, OnInit } from '@angular/core';
import { Line } from '../line/linha';
import { Path } from '../path/path';
import { Node } from '../node/Node';
import { PathPrint } from '../path/pathPrint';
import { TripService } from '../trip.service';
import { Trip } from './Trip';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css'],
})
export class TripComponent implements OnInit {
  constructor(private tripService: TripService) { }

  lines: Line[];
  tripsOfLine: Trip[];
  paths: Path[];
  paths2: Path[];
  nodes: Node[];
  pathsPrint: PathPrint[];
  pathsPrint2: PathPrint[];
  lineName: any;
  lineName2: any;
  lineName3: any;
  goPathName: any;
  pathAdHoc: any;
  selectedPathAdHoc: Path;
  returnPathName: any;
  selectedGoPath: Path;
  selectedReturnPath: Path;
  selectedLine: Line;
  selectedLine2: Line;
  selectedLine3: Line;
  trips: any;
  linePaths: any;
  pathsGo: any;
  pathsReturn: any;
  

  ngOnInit(): void {
    this.getLines();
    this.getNodes();
    this.getTripKey();
    this.pathsGo = [];
    this.pathsReturn = [];
  }
  onLineSelectedList() {
    this.lineName3 = this.selectedLine3;
    this.getTrips();
  }

  onLineSelected() {
    this.lineName = this.selectedLine;
    this.filterPaths(this.lineName.name)

  }
  onLineSelectedAdHoc() {
    this.lineName2 = this.selectedLine2;
    this.filterPaths2(this.lineName2.name);
  }

  onPathSelected() {
    this.pathAdHoc = this.selectedPathAdHoc;
  }

  onGoPathSelected() {
    this.goPathName = this.selectedGoPath;
  }

  onReturnPathSelected() {
    this.returnPathName = this.selectedReturnPath;
  }


  getTrips(): void {
    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('tripsAll')
    );
    this.clearTable(table);
    this.tripService.getTripsOfLine(this.lineName3.name).subscribe(
      (data) => {
        this.tripsOfLine = data;
        if (this.tripsOfLine.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Viagens para a linha inserida';
        }
      },
      (error) => {
        if (error.status == 500) {
          alert('Viagens não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      }
    );
  }
  clearTable(table) {
    var rows = table.rows;
    var i = rows.length;
    while (--i) {
      rows[i].parentNode.removeChild(rows[i]);
      // or
      // table.deleteRow(i);
    }
  }


  addTripAdHoc(beginHour2: string): void {
    this.tripService
      .addTripAdHoc(this.trips.length, this.lineName2.name, beginHour2, this.pathAdHoc).subscribe(
        (data) => {
          alert(
            'Viagem para a linha da rede com nome ' +
            this.lineName2.name +
            ' com início às ' +
            beginHour2 +
            ' horas, adicionada!'
          );
          window.location.reload();
        },
        (error) => {
          if (error.status == 500) {
            alert('Viagem já existe no sistema!');
          }
          if (error.status == 400) {
            alert('Erro! Tente novamente.');
          }
        }
      );
  }

  addTrip(beginHour: string, frequency: number, numberofTrips: number): void {
    this.tripService
      .addTrips(this.trips.length, this.lineName.name, beginHour, frequency, numberofTrips, this.goPathName, this.returnPathName).subscribe(
        (data) => {
          alert(
            'Viagem para a linha da rede com nome ' +
            this.lineName.name +
            ' com início às ' +
            beginHour +
            ' horas, adicionada!'
          );
          window.location.reload();
        },
        (error) => {
          if (error.status == 500) {
            alert('Viagem já existe no sistema!');
          }
          if (error.status == 400) {
            alert('Erro! Tente novamente.');
          }
        },
        
      );
  }

  getTripKey(): void {
    this.trips = this.tripService.getAllTrips().then((result) => {
      this.trips = result
    });
  }

  getLines(): void {
    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('linesAll')
    );

    this.tripService.getLines().subscribe(
      (data) => {
        this.lines = data;
        if (this.lines.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Linhas criadas';
        }
      },
      (error) => {
        if (error.status == 500) {
          alert('Linhas de rede não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      }
    );
  }

  getNodes(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('nodesAll');

    this.tripService.getNodes().subscribe(
      data => {
        this.nodes = data;

        if (this.nodes.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Nós criadas';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Nós de rede não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  filterLinePaths(name: string): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById("linesFilter");

    this.tripService.getLinePaths(name).subscribe(
      data => {
        this.linePaths = data;

        for (var i = 0; this.linePaths.length > i; i++) {
          var linepath = this.linePaths[i];
          for (var j = 0; this.paths.length > j; j++) {
            var path = this.paths[j][0];
            if(path.key === linepath.path && linepath.orientation === 'Go'){
              this.pathsGo.push(path);
            }else if (path.key === linepath.path && linepath.orientation === 'Return'){
              this.pathsReturn.push(path);
            }
          }
        }
        if (this.linePaths.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Percursos na linha';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Percursos não encontrados');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  filterPaths(name: string): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById("linesFilter");

    this.tripService.getPaths(name).subscribe(
      data => {
        this.paths = data;
        this.filterLinePaths(name);
        this.pathsPrint = [];
        var segment;
        var dot = ";";

        for (var i = 0; this.paths.length > i; i++) {
          var path = this.paths[i];
          var segments = path[0].pathNodes[0].pathNode;
          for (var j = 0; segments.length > j; j++) {
            var nodeName;
            for (var k = 0; this.nodes.length > k; k++) {
              var node = this.nodes[k];
              if (j === 0 && node.key === segments[j].node) {
                segment = node.name;
              }
              else if (node.key === segments[j].node) {
                nodeName = node.name;
              }
            }
            if (j !== 0) {
              segment = segment.concat(dot);
              segment = segment.concat(nodeName);
            }
          }
          this.pathsPrint.push(new PathPrint(path[0].key, segment));
        }

        if (this.paths.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Percursos na linha';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Percursos não encontrados');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  filterPaths2(name: string): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById("linesFilter");

    this.tripService.getPaths(name).subscribe(
      data => {
        this.paths2 = data;
        this.pathsPrint2 = [];
        var segment;
        var dot = ";";

        for (var i = 0; this.paths2.length > i; i++) {
          var path = this.paths2[i];
          var segments = path[0].pathNodes[0].pathNode;
          for (var j = 0; segments.length > j; j++) {
            var nodeName;
            for (var k = 0; this.nodes.length > k; k++) {
              var node = this.nodes[k];
              if (j === 0 && node.key === segments[j].node) {
                segment = node.name;
              }
              else if (node.key === segments[j].node) {
                nodeName = node.name;
              }
            }
            if (j !== 0) {
              segment = segment.concat(dot);
              segment = segment.concat(nodeName);
            }
          }
          this.pathsPrint2.push(new PathPrint(path[0].key, segment));
        }

        if (this.paths2.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Percursos na linha';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Percursos não encontrados');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }
}
