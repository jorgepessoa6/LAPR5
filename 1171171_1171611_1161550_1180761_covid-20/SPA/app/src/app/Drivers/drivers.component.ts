import { Component, OnInit } from '@angular/core';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
  }



   addDriver(name: string, description: string): void {

      const descriptionReq = document.getElementById("descriptionReq");
      const descriptionDriver = document.getElementById("descriptionDriver");
    
      
     if (description.length<20 || description.length>250){
       document.getElementById("descriptionReq").style.color="red";
      alert("Descrição deve ter entre 20 a 250 caracters");
     }else {
      document.getElementById("descriptionReq").style.color="green";
     }

     
    this.driverService.addDriver(name, description).subscribe(data => {
      alert("Tipo de tripulante com o nome " + name + " adicionado");
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
