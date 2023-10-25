import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserWithToken } from './model/user.interface';
import { BehaviorSubject, Observable, ignoreElements, map, of, tap } from 'rxjs';
import { Acceso, LoginCredentials, Role } from './model';
import { ApiService } from './api.service';
import { Token } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

// const USER_LOCAL_COOKIESERVICE_KEY = 'userData';
const USER_LOCAL_STORAGE_KEY = 'userData';

interface user {
  token: string;
  username:string;
  password:string;
  role:Role;
}

const USERS : user[] = [
  {
    token:'token1',
    username:'Roberto',
    password:'1234',
    role:'Super Administrador'
  },
  {
    token:'token2',
    username:'Fatima',
    password:'1234',
    role:'Administrador'
  },
  {
    token:'token3',
    username:'Maria',
    password:'1234',
    role:'Administrador'
  }
]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private acceso:Acceso ={
    nombreUsuario: '',
    clave: ''
  }

  private user = new BehaviorSubject<user | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(//private httpClient: HttpClient, 
    private router: Router,
    private apiService:ApiService,
    private cookieService: CookieService) {

    this.loadUserFromLocalStorage();
  }

  login(credentials: LoginCredentials) /*:Observable<never>*/ {

    this.acceso.nombreUsuario = credentials.username
    this.acceso.clave = credentials.password

    this.apiService.postAcceso('acceso', this.acceso)
    .subscribe( (respuesta:any) => {

      console.log(respuesta)

      // if(login){
      const login:user = {
        username: credentials.username,
        role: respuesta.role,
        token: respuesta.token,
        password: ''
      }
      
      this.pushNewUser(login)
      this.saveTokenToLocalStore(login)
      this.redirectToDashboard()
      // }

    }, (error) => { 

      console.log(error)

    })


    //const login = USERS.find(e=> e.username === credentials.username && e.password === credentials.password)
   
  }

  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  private pushNewUser(token: user) {
    this.user.next(token);
  }

  // private decodeToken(userToken: string): UserWithToken {
  //   const userInfo = JSON.parse(window.atob(userToken)) as User;

  //   console.log(userInfo)
  //   return { ...userInfo, token: userToken };
  // }

  private loadUserFromLocalStorage(): void {
    const userFromLocal = this.cookieService.get(USER_LOCAL_STORAGE_KEY);
    console.log(userFromLocal)
    userFromLocal && this.pushNewUser(JSON.parse(userFromLocal) as user );
  }
  private saveTokenToLocalStore(userToken: user): void {
    this.cookieService.set(USER_LOCAL_STORAGE_KEY, JSON.stringify(userToken))
    // localStorage.setItem(USER_LOCAL_STORAGE_KEY, userToken);
  }

  private removeUserFromLocalStorage(): void {
    this.cookieService.delete(USER_LOCAL_STORAGE_KEY)
    // localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }
}
