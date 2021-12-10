import { Component, OnInit } from '@angular/core';
import { ImportService } from '../import.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  constructor(private importService: ImportService) { }

  ngOnInit() {
  }

  importXML(file: any) {
    this.importService.importXML(file).subscribe(data => {},
      res => {
        if (res.status == 400) {
          alert("Erro na seleção do ficheiro");
        }
        if (res.status == 201) {
          alert("Ficheiro Importado com sucesso!");
        }
      });
  }
}
