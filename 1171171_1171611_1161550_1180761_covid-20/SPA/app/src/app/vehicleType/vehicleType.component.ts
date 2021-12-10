import { Component, OnInit } from '@angular/core';
import { VehicleTypeService } from '../vehicleType.service';

@Component({
  selector: 'app-vehicleType',
  templateUrl: './vehicleType.component.html',
  styleUrls: ['./vehicleType.component.css']
})
export class VehicleTypeComponent implements OnInit {

  constructor(private vehicleTypeService: VehicleTypeService) { }
  energysourceInput: number;
  selectedEnergysource: any;

  ngOnInit(): void {
  }

  optionsEnergySource = [
    { value: 1, name: 'Gasolina' },
    { value: 20, name: 'GPL' },
    { value: 23, name: 'Gasoleo' },
    { value: 50, name: 'Hidrogenio' },
    { value: 75, name: 'Eletrico' }
  ];

  onEnergySourceSelected() {
    this.energysourceInput = this.selectedEnergysource.value;
  }

   addVehicleType(name: string, autonomy:number, cost:number, averageSpeed: number, consumption: number, emissions: number): void {
      if (autonomy<1){
        document.getElementById("autonomyReq").style.color="red";
       alert("Autonomia deve ser um valor maior ou igual que 1");
      }else {
       document.getElementById("autonomyReq").style.color="green";
      }
      if(averageSpeed<1){
        document.getElementById("averageSpeedReq").style.color="red";
       alert("Velocidade média deve ser um valor maior ou igual que 1");
      }else {
       document.getElementById("averageSpeedReq").style.color="green";
      }
     

    this.vehicleTypeService.addVehicleType(name, autonomy, cost, averageSpeed,
      this.energysourceInput, consumption,emissions).subscribe(data => {
      alert("Tipo de viatura com o nome " + name + " adicionado");
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

}
