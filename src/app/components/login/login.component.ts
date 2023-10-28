import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMPTY, catchError, finalize } from 'rxjs';
import { ApiService } from 'src/app/auth/api.service';
import { AuthService } from 'src/app/auth/auth.service';
import { LoginCredentials } from 'src/app/auth/model';


// interface Acceso {
//   nombreUsuario: string,
//   clave: string
// }


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide: boolean = true;
  email!: string;
  password!: string;

  // private acceso:Acceso ={
  //   nombreUsuario: '',
  //   clave: ''
  // }
  
  
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,
    // private cookieService: CookieService,
    // private apiService:ApiService

    private auth:AuthService
    ) {}

  ngOnInit() {
    //this.authService.setLoggedIn(false);
    //console.log(this.cookieService.get('token'));
    let objeto = history.state.objeto;
    if(objeto){
      //while(this.cookieService.get('token')){
        // this.cookieService.deleteAll();
        //console.log(this.cookieService.get('token'));
      //}
      
    }
  

  }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.min(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  processingRequest = false;

  onSubmit() {

    // if (this.email === 'test@gmail.com' && this.password === '123456') {
    //   this.authService.setLoggedIn(true);
    //   this.router.navigate(['/dashboard']);
    // } else {
    //   alert('Usuario y/o contraseña incorrectos');
    //   console.log('Email:', this.email);
    //   console.log('Password:', this.password);
    // }
    
    // if (!this.loginForm.valid) {
    //   return;
    // }
    // console.log(this.loginForm.value);

    console.log(this.loginForm.value)

    //this.acceso.nombreUsuario = this.email
    //this.acceso.clave = this.password

    this.auth.login(this.loginForm.value as LoginCredentials)
    // .pipe(
    //   finalize(() => (this.processingRequest = false)),
    //   catchError((error: HttpErrorResponse) => {
    //     console.log(error)
    //     throw error;
    //   })
    // )
    


    // console.log(this.acceso)

    // this.apiService.postAcceso('acceso',this.acceso)
    // .subscribe( (respuesta:any) => {

      console.log(respuesta)

      

    }, (error) => { 
      console.log(error)
     
    //   console.log('Email:', this.email);
    //   console.log('Password:', this.password);
    })

    // this.auth.login(this.loginForm.value as LoginCredentials)

  }

  handleUnauthorized() {
    
  }
}
