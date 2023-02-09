import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { UserAccount } from '../models/user-account.model';

//const baseUrl = "http://localhost:8080/login"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = 'http://localhost:8080/'
  private readonly LOGGED_USER = 'user-logged'

  constructor(
    private http: HttpClient,
    private router: Router
    ) { }

    login(credentials: { password: any, username: any }): Observable<UserAccount> {
      return this.http.post<UserAccount>(this.API_URL+'authenticate', credentials).pipe(
        tap(autenticado => {
          if (LoginService.checkLogged(autenticado)) {
            sessionStorage.setItem(this.LOGGED_USER, JSON.stringify(autenticado));
            this.router.navigate(['/dashboard']);
          } else {
            Swal.fire('Not Authorized', '', 'error');
          }
    }));;
    }

    private static checkLogged(u: UserAccount): u is UserAccount {
      return (u as UserAccount).token !== undefined;
    }

  // login(userAccount: UserAccount): Observable<UserAccount> {
  //   return this.http.post<UserAccount>(this.API_URL+'authenticate', userAccount);
  // }

  setLoggedUser(userAccount: UserAccount) : void {
    sessionStorage.setItem(this.LOGGED_USER, JSON.stringify(userAccount));
  } 

  logout(): void {
    sessionStorage.removeItem(this.LOGGED_USER);
    this.router.navigate(['/login']);
  }

  getLoggedUser(): UserAccount {    
    const loggedUserString = sessionStorage.getItem(this.LOGGED_USER);
    if (loggedUserString) {
      return JSON.parse(loggedUserString);
    } else {
      return null;
    }
  }
}
