import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { UserAccount } from '../models/user-account.model';

//const baseUrl = "http://localhost:8080/login"

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  id: string;
  role: string;
  nome: string;
  expires: Date;
}

const credentialsKey = 'credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly API_URL = 'http://localhost:8080/'
  private readonly LOGGED_USER = 'user-logged'
  

  constructor(
    private http: HttpClient,
    private router: Router
    ) { 
      const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
      if (savedCredentials) {
        this._credentials = JSON.parse(savedCredentials);
      }
    }

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

  /**
   * Provides storage for authentication credentials.
   * The Credentials interface should be replaced with proper implementation.
   */
 
    private _credentials: Credentials | null = null;

    /**
     * Checks is the user is authenticated.
     * @return True if the user is authenticated.
     */
    isAuthenticated(): boolean {
      return !!this.credentials;
    }
  
    /**
     * Gets the user credentials.
     * @return The user credentials or null if the user is not authenticated.
     */
    get credentials(): Credentials | null {
      return this._credentials;
    }
  
    /**
     * Sets the user credentials.
     * The credentials may be persisted across sessions by setting the `remember` parameter to true.
     * Otherwise, the credentials are only persisted for the current session.
     * @param credentials The user credentials.
     * @param remember True to remember credentials across sessions.
     */
    setCredentials(credentials?: Credentials, remember?: boolean) {
      this._credentials = credentials || null;
  
      if (credentials) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem(credentialsKey, JSON.stringify(credentials));
      } else {
        sessionStorage.removeItem(credentialsKey);
        localStorage.removeItem(credentialsKey);
      }
    }
  }

