import { Component, OnInit } from '@angular/core';
import { PassingTime } from '../trip/PassingTime';
import { Trip } from '../trip/Trip';
import { WorkBlockService } from '../workBlock.service';
import { WorkBlock } from './workBlock';

@Component({
  selector: 'app-workBlock',
  templateUrl: './workBlock.component.html',
  styleUrls: ['./workBlock.component.css']
})
export class WorkBlockComponent implements OnInit {


  workBlocks: WorkBlock[];
  trips: Trip[];
  tripsClone: Trip[];
  tripsSelected: Trip[];
  tripsT: any;
  secondsMax: any;
  trip: any;
  selectedTrip:any;
  passingTimes: any;
  passingTimesMatrix: PassingTime[][];
  count: number;
  valid: boolean;
  arr: any;
  key: any;

  constructor(private workBlockService: WorkBlockService) { }

  ngOnInit(): void {
    this.tripsSelected = [];
    this.getTrips();
    this.count = 0;
    this.getWorkBlockKey();
  }

  onTripSelected() {
    this.trip = this.selectedTrip; 
  }
 
  getTripKey(): void {
      this.valid = true;
      this.workBlockService.getPassingTimes(this.trip.id).then((result) => {
        this.passingTimes = result;
        var passingTimesF;
        this.passingTimes.sort((a, b) => (a.time > b.time) ? 1 : -1);
        for(var z = this.passingTimes.length - 1; z > 0; z--){
          if(this.passingTimes[z] !== null){
            passingTimesF = this.passingTimes[z];
            break;
          }
        }
        for(var i = 0; i < this.count; i++){
          var passingTemp = this.passingTimesMatrix[i];
          var passingTempF;
          for(var j = passingTemp.length - 1; j > 0; j--){
            if(passingTemp[j] !== null){
              passingTempF = passingTemp[j];
              break;
            }
          }
          if(this.passingTimes[0].time < passingTemp[0].time && passingTimesF.time > passingTemp[0].time
            ||this.passingTimes[0].time < passingTempF.time && passingTimesF.time > passingTempF.time
            ||this.passingTimes[0].time > passingTemp[0].time && this.passingTimes[0].time < passingTempF.time){
              this.valid = false;
            }
        }
        if(this.valid === true){
        this.tripsSelected.push(this.trip);
        for(var k = 0; k < this.passingTimes.length; k++){
           this.passingTimesMatrix[this.count][k] = this.passingTimes[k];
        }
        this.count += 1;
       }
    });
  }

  addTrip(): void {
    const index = this.tripsClone.indexOf(this.trip, 0);
    if (index > -1) {
      this.tripsClone.splice(index, 1);
    }
    this.getTripKey();
   }
   
   addWorkBlock(duracaoMaxima: number, numeroMaximo : number): void {
     this.secondsMax = duracaoMaxima * 60;

     if(this.tripsSelected.length > 1){

     var temp = this.passingTimesMatrix.slice(0);
     this.arr = temp;
     for(var i = 0; i < this.tripsT - this.tripsSelected.length; i++){
      this.arr.splice(this.tripsT - this.tripsSelected.length - i + 1, 1);
     }

      this.sortMatrix();

    this.workBlockService.addWorkBlock(this.key,this.tripsSelected, this.secondsMax, numeroMaximo, this.arr).subscribe(data => {
      alert("Blocos de trabalho criados com sucesso");
      window.location.reload();
    },
      error => {
        if (error.status == 500) {
          alert("Blocos de trabalho criados com sucesso");
          window.location.reload();
        }
        if (error.status == 400) {
          alert("Erro. Tente novamente");
        }
      });
    }else{
      alert("Adicione mais Viagens!");
    }
  }
  getTrips(): void {
    var table: HTMLTableElement = <HTMLTableElement>document.getElementById('nodesAll');

    this.workBlockService.getTripsWithoutWorkBlock().subscribe(
      data => {
        this.trips = data;
        this.tripsClone = data;
        this.tripsT = data.length;

        this.passingTimesMatrix = [];
        for(var i: number = 0; i < this.trips.length; i++) {
          this.passingTimesMatrix[i] = [];
          for(var j: number = 0; j< 5; j++) {
              this.passingTimesMatrix[i][j] = null;
          }
      }

        if (this.trips.length == 0) {
          var row = table.insertRow();
          row.innerHTML = 'Não existem Viagens criadas';
        }
      },
      error => {
        if (error.status == 500) {
          alert('Viagens não encontradas');
        }
        if (error.status == 400) {
          alert('Erro! Tente novamente.');
        }
      },
    );
  }

  getWorkBlockKey(): void {
    this.workBlockService.getAllWorkBlocks().then((result) => {
      console.log(result);
        if(result.length != 0){
          this.key = result.length + 1;
        }
        else{
          this.key = 1;
        }
      });
    }

  sortMatrix() : void{

    var list = [];
    for (var j = 0; j < this.arr.length; j++){
       list.push({'passingTimes': this.arr[j], 'tripSelected': this.tripsSelected[j]});
    }
    list.sort(function(a, b) {
     return ((a.passingTimes[0].time < b.passingTimes[0].time) ? -1 : ((a.passingTimes[0].time == b.passingTimes[0].time) ? 0 : 1));
   });
   for (var k = 0; k < list.length; k++) {
     this.arr[k] = list[k].passingTimes;
     this.tripsSelected[k] = list[k].tripSelected;
   }
  }
}
