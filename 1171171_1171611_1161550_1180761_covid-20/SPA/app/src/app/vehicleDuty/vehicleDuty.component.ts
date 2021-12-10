import { Component, OnInit } from '@angular/core';
import { VehicleDutyService } from '../vehicleDuty.service';
import { ValueIteratorTypeGuard } from 'lodash';
import { Subject } from 'rxjs';
import { LineService } from '../line.service';
import { WorkBlock } from '../workBlock/workBlock';
import { workBlockDTO } from '../workBlock/workBlockDTO';
import { VehicleDutyPrint } from './vehicleDutyPrint';


@Component({
  selector: 'app-vehicleDuty',
  templateUrl: './vehicleDuty.component.html',
  styleUrls: ['./vehicleDuty.component.css'],
})
export class VehicleDutyComponent implements OnInit {

  constructor(private vehicleDutyService: VehicleDutyService) { }

  pathsPrint: VehicleDutyPrint[];
  wbList: any[];
  contiguousWB: workBlockDTO[];
  vehicleDutyOfDayList: any[];
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
  listVehicleDuty() {
    
    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('vehicleDutyAll')
    );
    this.clearTable(table);
    this.vehicleDutyService.getVDutyByDay().subscribe(
      data => {
        this.pathsPrint = [];
        this.vehicleDutyOfDayList = data;
        console.log(this.vehicleDutyOfDayList);
        var segment ="";
        var dot = "  |  ";

        for (var i = 0; this.vehicleDutyOfDayList.length > i; i++) {
          var key = this.vehicleDutyOfDayList[i].code;
          var rgb = this.vehicleDutyOfDayList[i].rgb;
          var segments = this.vehicleDutyOfDayList[i].workBlocks;
          for (var j = 0; segments.length > j; j++) {
            segment = segment.concat(dot);
            segment = segment.concat(segments[j].key);
          }
          this.pathsPrint.push(new VehicleDutyPrint(key, segment, rgb));
          var segment = "";
        }
        console.log(this.pathsPrint);
        if (this.pathsPrint.length==0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Servicos de Viatura no sistema!';
        }
      },
      
      error => {
        if (error.status == 500) {
          alert('Não existem Servicos de Viatura no sistema!');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
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
  addWorkBlock(): void {
    this.wbList.push(this.selectedWB);
    this.vehicleDutyService.getContiguousWB(this.selectedWB.endTime).subscribe(
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


  addVehicleDuty(code: string, rgb:string): void {
    var listIds = Array<any>();
    this.wbList.forEach(element => {
      listIds.push(element.id);
    });
    this.vehicleDutyService.addVehicleDuty(code, listIds, rgb).subscribe(
      (data) => {
        alert('Servico de viatura com codigo ' + code + ' adicionada!');
        window.location.reload();
      },
      (error) => {
        if (error.status == 500) {
          alert('Servico de viatura com codigo inserido já existe no sistema!');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      }
    );
  }
  getWorkBlocks(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('workblocksAll');

    this.vehicleDutyService.getAllWorkBlocks().subscribe(
      data => {
        this.contiguousWB = data;
        console.log(this.contiguousWB);
        if (this.contiguousWB.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Blocos de trabalho criadas';
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
}
