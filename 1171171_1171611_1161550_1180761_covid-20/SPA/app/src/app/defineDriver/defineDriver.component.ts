import { Component, OnInit } from '@angular/core';
import { DefineDriverService } from '../defineDriver.service';
import { Driver } from '../Drivers/Driver';

@Component({
  selector: 'app-defineDriver',
  templateUrl: './defineDriver.component.html',
  styleUrls: ['./defineDriver.component.css']
})
export class DefineDriverComponent implements OnInit {

  constructor(private defineDriverService: DefineDriverService) { }

  driverType: Driver[];
  driverTypeClone: string[];
  firstDriverTypeKey: any;
  selectedDriverTypeFirst: any;

  ngOnInit(): void {
    this.driverType = [];
    this.driverTypeClone = [];
    this.getDriver();
  }

  onFirstDriverTypeSelected() {
    this.firstDriverTypeKey = this.selectedDriverTypeFirst;
  }

  addDefineDriver(nrMecano: string, nome: string, DataNascimento: Date, CC: Number, NIF: Number,
    DataEntrada: Date, DataSaida: Date, DataCartaConducao: Date, NrCartaConducao: Number): void {
    if (nrMecano.length < 9) { // ???? Unique, 9chars?
      document.getElementById("nrMecanoReq").style.color = "red";
      alert("Numero Mecanografico deve ter obrigatoriamente 9 caracteres");
    } else {
      document.getElementById("nrMecanoReq").style.color = "green";
    }

    this.defineDriverService.addDefineDriver(nrMecano, nome, DataNascimento, CC, NIF, this.driverTypeClone,
      DataEntrada, DataSaida, DataCartaConducao, NrCartaConducao).subscribe(data => {
        alert("Tripulante com o numero mecanografico " + nrMecano + " adicionado");    
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
  getDriver(): void {
    this.defineDriverService.getDriver().subscribe(
      data => {
        this.driverType = data;
        if (this.driverType.length == 0) {
          alert('Não existem tipos de condutor criados');
        }
      },
      error => {
        if (error.status == 500) {
          alert('Tipo de condutor não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    )
  }

  addDriver(): void {
    this.driverTypeClone.push(this.selectedDriverTypeFirst.name);

    this.driverType.forEach(element => {
      if (element.name === this.selectedDriverTypeFirst.name) {

        this.driverType.splice(this.driverType.indexOf(element), 1);
      }

    });

  }
}
