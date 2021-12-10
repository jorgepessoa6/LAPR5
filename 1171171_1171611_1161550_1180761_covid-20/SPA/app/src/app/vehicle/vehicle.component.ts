import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { VehicleType } from '../vehicleType/VehicleType';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }

  vehicleType: VehicleType[];
  firstVehicleTypeKey:any;
  selectedVehicleTypeFirst:any;

  ngOnInit(): void {
    this.getVehicleType();
  }

  onFirstVehicleTypeSelected() {
    this.firstVehicleTypeKey= this.selectedVehicleTypeFirst;
  }
   addVehicle(matricula: string, VIN:string, dataEntrada: Date): void {
      
      
    this.vehicleService.addVehicle(matricula, VIN, this.firstVehicleTypeKey.name , dataEntrada).subscribe(data => {
      alert("Tipo de viatura com a matricula " + matricula + " adicionada");
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

  getVehicleType(): void {

    this.vehicleService.getVehicleType().subscribe(
      data => {
        this.vehicleType = data;

        if (this.vehicleType.length == 0) {
          alert('Não existem tipos de viatura criadas');
        }
      },
      error => {
        if (error.status == 500) {
          alert('Tipo de viatura não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

}

