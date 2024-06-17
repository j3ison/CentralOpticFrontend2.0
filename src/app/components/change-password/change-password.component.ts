import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  email = '';
  hide: boolean = true;
  password: string = ''
  password2!: string;

  loginForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(5)]],
    ConfirmPassword: ['', [Validators.required, Validators.minLength(5)]]
  })

  constructor(private http: HttpClient,private fb: FormBuilder) {}

  sendResetEmail(email: string) {

    if(this.password == this.password2){
      this.http.put<any>('https://localhost:7210/centralopticapi/send-email', {email}).subscribe(
        Response => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'La contraseña fue cambiada con exito!',
          })
          console.log(Response)
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Ups...',
            text: 'Algo salió mal!'
          })
          console.log(Response)
        }
      )
    }

    
  }

  sendEmail() {

  }
}
