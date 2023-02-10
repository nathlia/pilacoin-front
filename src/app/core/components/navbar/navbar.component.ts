import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PilacoinService } from 'src/app/modules/services/pilacoin-service.service';
import Swal from 'sweetalert2';
import { FalseLiteral } from 'typescript';
import { UserAccount } from '../../models/user-account.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: UserAccount = new UserAccount();
  url: string = '';
  logged: boolean = false;

  mineracaoButtonText: string = "Iniciar Mineração";
  minerando = false;

  constructor(
    private loginService: LoginService,
    private pilacoinService: PilacoinService,
    private router: Router
    ) { 
      this.url = router.url;
      this.user = this.loginService.getLoggedUser();
    }

  ngOnInit(): void {    
    if (this.user != null) {
      this.logged = true;         
    }   
    console.log(this.url)
  }

  logout() {
    this.loginService.logout();
    this.logged = false;
    let stop = false;
    this.stopMinerar(stop);    
    window.location.reload();
  }

  stopMinerar(stop: boolean) {
    this.pilacoinService.minerar(stop).subscribe({
      next: (data) => {
       //console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
}
