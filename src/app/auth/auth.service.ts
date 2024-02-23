import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser, User, UserWithToken } from './model/user.interface';
import { BehaviorSubject, Observable, ignoreElements, map, of, tap } from 'rxjs';
import { Acceso, LoginCredentials, Role } from './model';
import { ApiService } from './api.service';
import { Token } from '@angular/compiler';
import { CookieService } from 'ngx-cookie-service';

// const USER_LOCAL_COOKIESERVICE_KEY = 'userData';
const USER_LOCAL_STORAGE_KEY = 'userData';

// const USERS : LoginUser[] = [
//   {
//     id: 1,
//     token:'token1',
//     username:'Roberto',
//     password:'1234',
//     role:'Super Administrador'
//   },
//   {
//     id: 2,
//     token:'token2',
//     username:'Fatima',
//     password:'1234',
//     role:'Administrador'
//   },
//   {
//     id: 3,
//     token:'token3',
//     username:'Maria',
//     password:'1234',
//     role:'Administrador'
//   }
// ]

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private acceso:Acceso ={
    nombreUsuario: '',
    clave: ''
  }

  private user = new BehaviorSubject<LoginUser | null>(null);
  user$ = this.user.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(Boolean));

  constructor(//private httpClient: HttpClient, 
    private router: Router,
    private apiService:ApiService,
    private cookieService: CookieService) {

    this.loadUserFromLocalStorage();
  }

  login(credentials: LoginCredentials): Promise<boolean> /*:Observable<never>*/ {

    this.acceso.nombreUsuario = credentials.username
    this.acceso.clave = credentials.password

    return new Promise<boolean>((resolve, reject) => {

      this.apiService.postAcceso('acceso', this.acceso)
      .subscribe( (respuesta:any) => {
  
        console.log(respuesta)
  
        // if(login){
        const login:LoginUser = {
          username: credentials.username,
          role: respuesta.role,
          token: respuesta.token,
          id: respuesta.id,
          numEmpleado: respuesta.numEmpleado,
          password: ''
        }
        
        this.pushNewUser(login)
        this.saveTokenToLocalStore(login)
        this.redirectToDashboard()

        resolve(true);
  
      }, (error) => { 
  
        resolve(false);
      })    
    })
  }

  logout(): void {
    this.removeUserFromLocalStorage();
    this.user.next(null);
    this.router.navigateByUrl('/login');
  }

  private redirectToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  private pushNewUser(token: LoginUser) {
    this.user.next(token);
  }

  // private decodeToken(userToken: string): UserWithToken {
  //   const userInfo = JSON.parse(window.atob(userToken)) as User;

  //   console.log(userInfo)
  //   return { ...userInfo, token: userToken };
  // }

  private loadUserFromLocalStorage(): void {
    const userFromLocal = this.cookieService.get(USER_LOCAL_STORAGE_KEY);
    //console.log(userFromLocal);

    //const UserLogin:LoginUser = JSON.parse(userFromLocal) as LoginUser;
    userFromLocal && this.pushNewUser(JSON.parse(userFromLocal) as LoginUser );
   
  }
  
  private saveTokenToLocalStore(userToken: LoginUser): void {
    this.cookieService.set(USER_LOCAL_STORAGE_KEY, JSON.stringify(userToken))
    // localStorage.setItem(USER_LOCAL_STORAGE_KEY, userToken);
  }

  private removeUserFromLocalStorage(): void {
    this.cookieService.delete(USER_LOCAL_STORAGE_KEY)
    // localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }
}
