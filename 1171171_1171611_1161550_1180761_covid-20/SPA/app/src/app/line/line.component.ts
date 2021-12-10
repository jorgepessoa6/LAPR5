import { Component, OnInit } from '@angular/core';
import { ValueIteratorTypeGuard } from 'lodash';
import { Subject } from 'rxjs';
import { LineService } from '../line.service';
import { Line } from './linha';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css'],
})
export class LineComponent implements OnInit {

  constructor(private lineService: LineService) {}

  lines: Line[];
  nodes: Node[];
  nodesClone: Node[];
  firstNodeKey:any;
  lastNodeKey:any;
  selectedNodeFirst:any;
  selectedNodeLast:any;

  ngOnInit(): void {
    this.getNodes();
  }

  onFirstNodeSelected() {
    this.firstNodeKey = this.selectedNodeFirst; 
  }

  onLastNodeSelected() {
    this.lastNodeKey = this.selectedNodeLast; 
  }

  addLine(name: string, color: string): void {
    this.lineService.addLine(name, this.firstNodeKey.name, this.lastNodeKey.name, color).subscribe(
      (data) => {
        alert('Linha da rede com nome ' + name + ' adicionada!');
        window.location.reload();
      },
      (error) => {
        if (error.status == 500) {
          alert('Linha da rede com nome inserido já existe no sistema!');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      }
    );
  }

  getLines(): void {
    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('linesAll')
    );

    this.lineService.getLines().subscribe(
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

  filterLines(name: string): void {
    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('linesFilter')
    );

    this.lineService.filterLines(name).subscribe(
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

    this.lineService.getNodes().subscribe(
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
}
