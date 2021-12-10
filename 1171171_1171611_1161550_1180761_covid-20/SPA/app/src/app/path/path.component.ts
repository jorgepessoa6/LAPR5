import { Component, OnInit } from '@angular/core';
import { PathService } from '../path.service';
import { PathNode } from './pathNode';
import { Direction } from './direction';
import { Line } from '../line/linha';
import { Path } from './path';
import { Node } from '../node/Node'
import { PathPrint } from './pathPrint';

@Component({
  selector: 'app-path',
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.css']
})
export class PathComponent implements OnInit {

  pathNodes: Array<PathNode>;
  lines: Line[];
  nodes: Node[];
  nodesClone: Node[];
  paths: Path[];
  pathsPrint: PathPrint[];
  lineName: any;
  selected:any;
  nodeKey:any;
  selectedNode:any;
  selectedLine:any;
  selectedIsEmpty:any;
  selectedOri:any;

  optionsIsEmpty = [
    { value: true, name: 'Sim' },
    { value: false, name: 'Não' }
  ];

  optionsOrientation = [
    { value: Direction.Go, name: 'Ida' },
    { value: Direction.Return, name: 'Volta' }
  ];

  orientationInput: Direction;
  isEmptyValue: boolean;



  constructor(private pathService: PathService) { }

  ngOnInit(): void {
    this.pathNodes = [];
    this.getLines();
    this.getNodes();
  }

  onOptionsSelected() {
    this.lineName = this.selected.name; 
  }

  onNodeSelected() {
    this.nodeKey = this.selectedNode; 
  }

  onLineSelected() {
    this.filterPaths(this.selectedLine.name); 
  }

  onIsEmptySelected() {
    this.isEmptyValue = this.selectedIsEmpty.value;
  }

  onOriSelected() {
    this.orientationInput = this.selectedOri.value;
  }

  addPathNode(distance: number, duration: number): void {
    const index = this.nodesClone.indexOf(this.nodeKey, 0);
    if (index > -1) {
      this.nodesClone.splice(index, 1);
    }   
    this.pathNodes.push(new PathNode(this.nodeKey.key, distance, duration));
   }
   
   addPath(linePathIDInput: string, name : string): void {

    this.pathService.addPath(this.lineName,linePathIDInput, name,this.orientationInput,this.isEmptyValue, this.pathNodes).subscribe(data => {
      alert("Percurso com nome " + name + " adicionado");
      this.nodesClone = this.nodes;
      window.location.reload();
    },
      error => {
        if (error.status == 500) {
          alert("Erro: Dados inválidos");
        }
        if (error.status == 400) {
          alert("Erro. Tente novamente");
        }
      });
  }
  getLines(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('linesAll');

    this.pathService.getLines().subscribe(
      data => {
        this.lines = data;

        if (this.lines.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Linhas criadas';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Linhas de rede não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  getNodes(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('nodesAll');

    this.pathService.getNodes().subscribe(
      data => {
        this.nodes = data;
        this.nodesClone = data;

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

  filterPaths(name: string): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('linesFilter');
    


    this.pathService.getPaths(name).subscribe(
      data => {
        this.paths = data;
        this.pathsPrint = [];
        var segment;
        var dot = ";";

        for(var i = 0;this.paths.length > i; i++){
          var path = this.paths[i];
          var segments = path[0].pathNodes[0].pathNode;
          for(var j = 0; segments.length > j; j++){
            var nodeName;
            for(var k = 0; this.nodes.length > k; k++){
              var node = this.nodes[k];
              if(j === 0 && node.key === segments[j].node){
                segment = node.name;
              }
              else if(node.key === segments[j].node){
                nodeName = node.name;
              }
            }
            if(j !== 0){
              segment = segment.concat(dot);
              segment = segment.concat(nodeName);
            }
          }
          this.pathsPrint.push(new PathPrint(path[0].key, segment));
        }

        if (this.paths.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Paths na linha';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Paths não encontrados');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

}
