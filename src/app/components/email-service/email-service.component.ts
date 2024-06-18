import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-service',
  templateUrl: './email-service.component.html',
  styleUrls: ['./email-service.component.css']
})
export class EmailServiceComponent {
  email = '';

  constructor(private http: HttpClient) {}

  sendResetEmail(email: string) {

    this.http.post<any>('https://localhost:7210/centralopticapi/send-email', {email}).subscribe(
      Response => {
        Swal.fire({
          icon: 'success',
          title: 'Exito',
          text: 'El correo fue enviado con Exito!',
        })
        console.log(Response)
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Algo salió mal!'
        })
        console.error(error);
      }
    )
    
  }

  sendEmail() {

  }
}
