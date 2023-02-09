import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor{

  constructor(
    private loginService: LoginService
  ) { }
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
  //   const LOGGED_USER = this.loginService.getLoggedUser();

  //   if (LOGGED_USER) {
  //     const authRequest = req.clone(
  //       {setHeaders: {'Authorization' : 'Bearer ' + LOGGED_USER.token}}
  //     );
  //     return next.handle(authRequest);
  //   } else {
  //     return next.handle(req);
  //   }
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const u = this.loginService.getLoggedUser();
    if (u) {
        const jwtRequest = request.clone({setHeaders: {Authorization: 'Bearer ' + u.token}});
        return next.handle(jwtRequest).pipe(
            tap((evt) => {}, (err) => {
                    if ([401, 403].indexOf(err.status) !== -1) {
                        Swal.fire('Não permitido', '', 'error');
                        // this.loginService.logout();
                        // location.reload();
                    }
                }
            )
        );
    } else {
        return next.handle(request).pipe(
            tap(evt => {
            })
        );
    }
}
}
