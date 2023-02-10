import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import Swal from 'sweetalert2';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandlerService implements ErrorHandler {

  constructor(
    private loginService: LoginService,
    private zone: NgZone
  ) { }

  handleError(error: HttpErrorResponse | any): void {

    if (error instanceof HttpErrorResponse) {
      console.log("Inside error handler" + error.status)
      console.log(error.error)
      // console.log(error.message)
      // console.log(error.url);  
          
      switch (error.status) {
        case 500:          
          Swal.fire({
            title: 'Oops...',
            text: 'That username is already in use! Please choose another one.',    
            color: 'var(--primary)',
            background: 'var(--main)',    
            imageUrl: './assets/img/icons/error.webp',
            imageWidth: 224,
            imageHeight: 256,
            imageAlt: 'Custom image',
          })    
          break;     
        case 400:
          //alert(error.error)
          Swal.fire({
            title: 'Oops...',
            text: 'Wrong Username or Password!',    
            color: 'var(--primary)',
            background: 'var(--main)',    
            imageUrl: './assets/img/icons/error.webp',
            imageWidth: 224,
            imageHeight: 256,
            imageAlt: 'Custom image',
          })    
          break;   
        case 401:
          Swal.fire({
            title: 'Oops...',
            text: 'Wrong Username or Password!',    
            color: 'var(--primary)',
            background: 'var(--main)',           
          })    
          break;      
        case 403:
          alert('Access denied!')
          break;    
        default:
          break;
      }            
    }    
  }
}
