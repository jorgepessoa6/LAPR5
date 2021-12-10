import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { INodeDTO } from '../node/nodeDTO';
import { TripResultService } from '../tripResult.service';
import { TripResult } from './tripResult';

@Component({
  selector: 'app-tripResult',
  templateUrl: './tripResult.component.html',
  styleUrls: ['./tripResult.component.css']
})
export class TripResultComponent implements OnInit {

  tripResult: TripResult[];
  nodes: INodeDTO[];
  node1: any;
  node2: any;
  selectedNode1: any;
  selectedNode2: any;

  constructor(private tripResultService: TripResultService) { }

  ngOnInit(): void {
    this.getNodes();
  }
  onNode1Selected() {
    this.selectedNode1 = this.node1;
  }

  onNode2Selected() {
    this.selectedNode2 = this.node2;
  }

  getNodes(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('nodesAll');

    this.tripResultService.getNodes().subscribe(
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

  addRequest(t: string): void {
    //var t2 = new Date(t);
    console.log(t);
    var t2 = t.split(":");
    var temp = Number(t2[0]) * 3600 + Number(t2[0]) * 60;
    console.log(temp);
    this.tripResultService.postRequest(temp, this.node1.shortName, this.node2.shortName).subscribe(data => {
      alert("Pedido efectuado com sucesso criados com sucesso");
      window.location.reload();
    },
      error => {
        if (error.status == 500) {
          alert("Erro no pedido");
        }
        if (error.status == 400) {
          alert("Erro. Tente novamente");
        }
      });
  }

  getTripResults(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('tripResultAll');

    this.tripResultService.getTripResults().subscribe(
      data => {
        console.log(data);
        this.tripResult = [];
        data.forEach(element => {
          var horasIniciais = Math.trunc((Number(element.time) / 3600));
          var horasIniciaisS = String(horasIniciais);
          if(horasIniciais <10){
            horasIniciaisS = "0" + horasIniciais
          }
          var minIniciais = Math.trunc(Number(element.time) % 3600 / 60);
          var minIniciaisS = String(minIniciais);
          if(minIniciais <10){
            minIniciaisS = "0" + minIniciais
          }
          console.log(data.noI);
          var horasFinais = Math.trunc((Number(element.finalTime) / 3600));
          var horasFinaisS = String(horasFinais);
          if(horasFinais <10){
            horasFinaisS = "0" + horasFinais
          }
          var minFinais = Math.trunc(Number(element.finalTime) % 3600 / 60);
          var minFinaisS = String(minFinais);
          if(minFinais <10){
            minFinaisS = "0" + minFinais
          }
          var t = { time: horasIniciaisS + ":" + minIniciaisS, noI: element.noI, noF: element.noF, caminho: element.caminho, finalTime: horasFinaisS + ":" + minFinaisS }
          this.tripResult.push(t);
        });

        if (this.tripResult.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem trip results criados';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Trip results não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }
}