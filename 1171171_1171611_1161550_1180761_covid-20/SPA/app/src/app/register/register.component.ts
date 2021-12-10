import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';    
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule  } from '@angular/forms';    
import { ActivatedRoute, Router } from '@angular/router';    
import { first } from 'rxjs/operators';    
import { AuthService } from '../auth.service';    
    
@Component({    
  selector: 'app-register',    
  templateUrl: './register.component.html',    
  styleUrls: ['./register.component.css']    
})    
export class RegisterComponent implements OnInit {    
    
  loading = false;    
  registerForm: FormGroup;    
  submitted = false;    
  returnUrl: string;    
    
  constructor(private formBuilder: FormBuilder,    
    private authService: AuthService,
    private router: Router) { }    
    
  ngOnInit() {
    
  }    
    
  public register(firstName: string, userName: string, email: string, password: string, passwordRepeat: string): void {

    let element = <HTMLInputElement>document.getElementById("consentimentoCheck");
    if (element.checked == false) {
      alert("Termos não aceites.");
      return;
    }

    if (password != passwordRepeat) {
      alert("Password's não coincidem");
    } else {
      if (!this.validaForm(userName, email, firstName, password)) {
        alert("Formulário mal preenchido");
      } else {
        this.authService.register(userName, email, firstName, password).subscribe(data => {
          alert("Registado com sucesso!");
          this.router.navigate(['/login']); 
        },
          error => { this.handleError(error); });
      }
    }
  }

  handleError(error: HttpErrorResponse) {
    if (error.status == 400) {
      alert("Username já está em uso, tente dar login");
      this.fecharPopup();
    } else {
      alert("Serviço indisponível, tente mais tarde.");
    }

  }

  validaForm(userName: string, email: string, firstName: string, password: string) {
    if (userName != "" && email != "" && email != "" && password != "") {
      return true;
    }
    return false;
  }

  abrirPopup() {
    document.getElementById("consentimento").style.display = "block";
  }

 fecharPopup() {
    document.getElementById("consentimento").style.display = "none";
  }
}  