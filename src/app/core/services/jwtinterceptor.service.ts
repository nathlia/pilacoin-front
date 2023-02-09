import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class JwtinterceptorService implements HttpInterceptor{
  isRefreshing: any;
  eventBusService: any;

  constructor(
    private loginService: LoginService
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const LOGGED_USER = this.loginService.getLoggedUser();
    const token = LOGGED_USER?.token;

    // if (!environment.production) {
    //     log.debug('Auth Token', token);
    // }

    if (!token) {
      return next.handle(req);
    }

    const req1 = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
      withCredentials: true,
    });

    return next.handle(req1).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error instanceof HttpErrorResponse && !req.url.includes('auth/login') && error.status === 401) {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    ) as Observable<HttpEvent<any>>;
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      //if (this.credentialsService.isAuthenticated()) {
      // this.eventBusService.emit(new EventData('logout', null));
    }

    return next.handle(request);
  }
}

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

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const u = this.loginService.getLoggedUser();
//     if (u) {
//         const jwtRequest = request.clone({setHeaders: {Authorization: 'Bearer ' + u.token}});
//         return next.handle(jwtRequest).pipe(
//             tap((evt) => {}, (err) => {
//                     if ([401, 403].indexOf(err.status) !== -1) {
//                         Swal.fire('Não permitido', '', 'error');
//                         // this.loginService.logout();
//                         // location.reload();
//                     }
//                 }
//             )
//         );
//     } else {
//         return next.handle(request).pipe(
//             tap(evt => {
//             })
//         );
//     }
// }
// }
