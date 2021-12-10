import { Component, OnInit } from '@angular/core';
import { NodeService } from '../node.service';
import { Node } from './Node';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent implements OnInit {

  constructor(private nodeService: NodeService) { }
  nodes: Node[];
  isDepot: boolean;
  selectedIsDepot: any;
  isReliefPoint: boolean;
  selectedIsReliefPoint: any;
  ngOnInit(): void {
  }

  optionsIsDepot = [
    { value: true, name: 'Sim' },
    { value: false, name: 'Não' }
  ];

  optionsIsReliefPoint = [
    { value: true, name: 'Sim' },
    { value: false, name: 'Não' }
  ];

  onIsDepotSelected() {
    this.isDepot = this.selectedIsDepot.value;
  }

  onIsReliefPointSelected() {
    this.isReliefPoint = this.selectedIsReliefPoint.value;
  }

   addNode(key:string, name: string, lat: number, lon: number, shortName: string): void {
    
    const nameReq = document.getElementById("nameReq");
    const nameNode = document.getElementById("nameNode");
    

    if (name.length>200){
       nameReq.style.color="red";
      alert("Nome deve ter um máximo de 200 caracteres");
     }else {
      nameReq.style.color="green";
     }

     const shortNameReq = document.getElementById("shortNameReq");
    const shortNameNode = document.getElementById("shortNameNode");
    
      
    if (shortName.length>200){
       shortNameReq.style.color="red";
      alert("Abreviatura deve ter um máximo de 20 caracteres");
     }else {
      shortNameReq.style.color="green";
     }
    

    this.nodeService.addNode(key, name, lat, lon, shortName, this.isDepot, this.isReliefPoint).subscribe(data => {
      alert("Nó de rede com nome " + name + " adicionado");
      window.location.reload();
    },
      error => {
        if (error.status == 500) {
          alert("ERROR: Dados inseridos não válidos");
        }
        if (error.status == 400) {
          alert("Erro. Tente novamente");
        }
      });
  }
  
  getNodes(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('nodesAll');

    this.nodeService.getNodes().subscribe(
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

  filterName(name: string): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('linesFilter');

    this.nodeService.filterNodes(name).subscribe(
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


}
