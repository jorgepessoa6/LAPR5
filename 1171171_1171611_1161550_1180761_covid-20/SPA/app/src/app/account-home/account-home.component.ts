import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User1 } from '../user-home/User';
import { UserService } from '../user.service';

@Component({
    selector: 'app-account-home',
    templateUrl: './account-home.component.html',
    styleUrls: ['./account-home.component.css']
})
export class AccountHomeComponent implements OnInit {

    userDataSubscription: any;
    userData = new User1();

    constructor(private userService: UserService, private authService: AuthService) { }

    ngOnInit(): void {
        this.fetchUserData()
    }

    fetchUserData() {
        this.userDataSubscription = this.authService.userData.asObservable().subscribe(data => {
            this.userData = data;
        });
    }

    public deleteAccount(): void {
        let element = <HTMLInputElement>document.getElementById("consentimentoCheck");
        if (element.checked == false) {
          alert("Termos não aceites.");
          this.ngOnInit()
          return;
        }

        this.userService.deleteUser(this.userData).subscribe(data => {
            alert("Conta apagada com sucesso!");
            this.logout();
        },
            error => { this.handleError(error); });
    }

    handleError(error: HttpErrorResponse) {
        alert("Serviço indisponível, tente mais tarde.");
    }


    logout() {
        this.authService.logout();
    }

    abrirPopup() {
        document.getElementById("consentimento").style.display = "block";
      }
    
     fecharPopup() {
        document.getElementById("consentimento").style.display = "none";
      }

}
