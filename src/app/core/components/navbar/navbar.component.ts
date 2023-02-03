import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private loginService: LoginService,
    private router: Router
    ) { 
      this.url = router.url;
      this.user = this.loginService.getLoggedUser();
    }

  ngOnInit(): void {    
    if (this.user != null) {
      this.logged = true; 
        
    }   
  }

  logout() {
    this.loginService.logout();
    this.logged = false;
    window.location.reload();
  }
}
