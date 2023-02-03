import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor{

  constructor(
    private loginService: LoginService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const LOGGED_USER = this.loginService.getLoggedUser();

    if (LOGGED_USER) {
      const authRequest = req.clone(
        {setHeaders: {'Authorization' : 'Bearer '+LOGGED_USER.token}}
      );
      return next.handle(authRequest);
    }
    else {
      return next.handle(req);
    }
  }
}
