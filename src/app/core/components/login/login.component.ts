import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAccount } from '../../models/user-account.model';
import { LoginService } from '../../services/login.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = this.formBuilder.group(
   { 
    username: this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
    password: this.formBuilder.control('', [Validators.required, Validators.minLength(3)])
  });  

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
    ) { }

  ngOnInit(): void {
          

  }

  login() {
    if (this.formLogin.valid) {
      const credentials = {
        password: this.formLogin.value.password,
        username: this.formLogin.value.username
      };
  
      this.loginService.login(credentials).subscribe(
        next => {
          this.loginService.setLoggedUser(next)
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            color: 'var(--background)',
            background: 'var(--primary)',
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })          
          Toast.fire({
            icon: 'success',
            title: 'Signed in successfully'
          })
          this.router.navigate(['/dashboard'])
          window.location.reload()
        })   
    } 
    else {
      Swal.fire({
        // icon: 'error',
        title: 'Oops...',
        text: 'Wrong Username or Password!',    
        color: 'var(--primary)',
        background: 'var(--main)',    
        imageUrl: './assets/img/icons/error.webp',
        imageWidth: 224,
        imageHeight: 256,
        imageAlt: 'Custom image',
      })          
    }
  }

}
