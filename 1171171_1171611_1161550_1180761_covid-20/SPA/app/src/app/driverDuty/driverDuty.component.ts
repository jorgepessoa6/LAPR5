import { Component, OnInit } from '@angular/core';
import { VehicleDutyService } from '../vehicleDuty.service';
import { ValueIteratorTypeGuard } from 'lodash';
import { Subject } from 'rxjs';
import { LineService } from '../line.service';
import { WorkBlock } from '../workBlock/workBlock';
import { workBlockDTO } from '../workBlock/workBlockDTO';
import { DriverDutyPrint } from './driverDutyPrint';
import { DriverDutyService } from '../driverDuty.service';

@Component({
  selector: 'app-driverDuty',
  templateUrl: './driverDuty.component.html',
  styleUrls: ['./driverDuty.component.css'],
})
export class DriverDutyComponent implements OnInit {

  constructor(private driverDutyService: DriverDutyService) { }

  pathsPrint: DriverDutyPrint[];
  wbList: any[];
  contiguousWB: workBlockDTO[];
  allDriverDuty: any[];
  //vehicleDutyOfDayList: any[];
  selectedWB: any;

  ngOnInit(): void {
    this.wbList = [];
    this.getWorkBlocks();
    console.log(this.contiguousWB);
    console.log()
  }

  onWBSelected() {
    this.selectedWB = this.selectedWB;
  }

  addWorkBlock(): void {
    this.wbList.push(this.selectedWB);
    console.log(this.selectedWB.id);
    this.driverDutyService.getContiguousWBofSameVehicleDuty(this.selectedWB.endTime, this.selectedWB.id).subscribe(
      data => {
        this.contiguousWB = data;
      },
      error => {
        if (error.status == 500) {
          alert('Blocos de Trabalho não encontrados');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      });
  }


  addDriverDuty(code: string, rgb: string): void {
    var listIds = Array<any>();
    this.wbList.forEach(element => {
      listIds.push(element.id);
    });
    this.driverDutyService.addDiverDuty(code, listIds, rgb).subscribe(
      (data) => {
        alert('Servico de triplantes com codigo ' + code + ' adicionada!');
        window.location.reload();
      },
      (error) => {
        if (error.status == 500) {
          alert('Servico de tripulantes com codigo inserido já existe no sistema!');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      }
    );
  }
  getWorkBlocks(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('workblocksAll');

    this.driverDutyService.getAllWorkBlocks().subscribe(
      data => {
        this.contiguousWB = data;
        console.log(this.contiguousWB);
        if (this.contiguousWB.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Blocos de trabalho criadas';
        }
      },
      error => {
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  listDriverDuty() {

    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('driverDutyAll')
    );
    this.clearTable(table);
    this.driverDutyService.getAll().subscribe(
      data => {
        this.pathsPrint = [];
        this.allDriverDuty = data;
        console.log(this.allDriverDuty);
        var segment = "";
        var dot = "  |  ";

        for (var i = 0; this.allDriverDuty.length > i; i++) {
          var key = this.allDriverDuty[i].code;
          var rgb = this.allDriverDuty[i].rgb;
          var segments = this.allDriverDuty[i].workBlocks;
          for (var j = 0; segments.length > j; j++) {
            segment = segment.concat(dot);
            segment = segment.concat(segments[j].key);
          }
          this.pathsPrint.push(new DriverDutyPrint(key, segment, rgb));
          var segment = "";
          
        }
        console.log(this.pathsPrint);
        if (this.pathsPrint.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Servicos de Tripulante';
        }
      },
      error => {
        alert('Erro! Tente novamente.');
      });
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
}
