import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
      return this.http.post<UserAccount>(this.API_URL+'authenticate', credentials);
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
    return JSON.parse(<string> sessionStorage.getItem(this.LOGGED_USER));   
  }
}
