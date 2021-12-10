import { Component, OnInit } from '@angular/core';
import { GenerationsService } from '../generations.service';
import { Generations } from './Generations';
import { Population } from './Population';

@Component({
  selector: 'app-generations',
  templateUrl: './generations.component.html',
  styleUrls: ['./generations.component.css'],
})
export class GenerationsComponent implements OnInit {
  generations: Population[];
  lgenerations: Population[];
  pop: any;
  order: any;
  perc: any;
  selected:any;
  

  constructor(private genService: GenerationsService) { }

  ngOnInit(): void {
    this.generations = [];
    this.lgenerations = [];
    this.getAllGenerations();
  }

  options = [
    { value: 20, name: '20%' },
    { value: 30, name: '30%' }
  ];


  onSelected() {
    this.perc = this.selected.value;
    console.log(this.perc);
  }

  sendRequest(
    VD: number,
    NG: number,
    DP: number,
    P1: number,
    P2: number,
    TT: number,
    AMIN: number,
    STABVAL: number
  ) {
    this.genService
      .sendRequest(VD, NG, DP, P1, P2, this.perc, TT, AMIN, STABVAL)
      .subscribe(
        (data) => {
          var stringTemp = data.split(",1,");
          for (var i = 0; i < stringTemp.length; i++) {
            this.generations.push(new Population(stringTemp[i], i + 1, this.order));
            this.lgenerations.push(new Population(stringTemp[i], i + 1, this.order));
          }
          alert('Pedido de Geração efetuado com sucesso!');
          this.showGenerations();
          this.addGeneration();
          this.order = this.order + 1;
          this.lgenerations = [];
          window.location.reload();
        },
        (error) => {
          if (error.status == 500) {
            alert('Erro! Tente novamente.');
          }
          if (error.status == 400) {
            alert('Erro! Tente novamente.');
          }
        }
      );
  }

  addGeneration(): void {

    this.genService.addGeneration(this.lgenerations).subscribe(data => {
    });
  }

  showGenerations() {
    var table: HTMLTableElement = <HTMLTableElement>(
      document.getElementById('generations')
    );

    if (this.generations.length == 0) {
      var row = table.insertRow();
      row.innerHTML = 'Não existem Gerações criadas';
    }
  }

  getPopulations(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('geracoesAll');

    this.genService.getPopulations().subscribe(
      data => {
        this.pop = data;
        console.log(this.pop);
        this.pop.sort(  function mysortfunction(a, b) {

          var o1 = a.orderGen;
          var o2 = b.orderGen
        
          var p1 = a.order;
          var p2 = b.order;
        
          if (o1 < o2) return -1;
          if (o1 > o2) return 1;
          if (p1 < p2) return -1;
          if (p1 > p2) return 1;
          return 0;
        })

        if (this.pop.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Gerações criadas';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Gerações não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  getAllGenerations(): void {
    this.genService.getAllGenerations().subscribe(data => {
      this.order = data.length + 1;   
    });
  }
}
