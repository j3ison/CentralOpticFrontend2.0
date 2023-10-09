import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventBtnClick, HeaderData, HeaderSearch } from './header-data';
import { userItems } from './header-dummy-data';
// import { CdkMenuTrigger } from '@angular/cdk/overlay';
import { MatMenuTrigger } from '@angular/material/menu';

import { CdkMenuTrigger } from '@angular/cdk/menu';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HeaderService } from './service/header.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderSearch]
})
export class HeaderComponent implements OnInit{


  userItems = userItems;
  iconClassLogout:string = 'fa-solid fa-door-closed';

  
  // Esta variable se utiliza para hacer la animacion de la barra de buscar 
  canShowSearchAsOverlay = false
  // Al inicio del programa se utiliza para marcar en que opcion (tablas / form) se inicia
  

  // Extrae a tiempo real lo que se escriba en el input
  title: string = '';

  // se usa para que sea response (no tocar XD)
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  // Para obtener el tamaño la pantalla de windows 
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }


  constructor(private headerService:HeaderService,
    private router: Router,
    private auth:AuthService){
    
  }
  
  ngOnInit(){
    this.checkCanShowSearchAsOverlay(window.innerWidth);
    this.headerService.title$.subscribe(title => {
      this.title = title;
    });
  }




  // para modificar clases (no tocar XD)
  getHeadClass():string{
    let styleClass ='';
    if(this.collapsed && this.screenWidth > 834){
      styleClass= 'head-trimmed';
    }else if(!this.collapsed && this.screenWidth<= 835 && this.screenWidth > 0){
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }

  // para modificar clases (no tocar XD)
  checkCanShowSearchAsOverlay(innerWidth:number):void{
    if(innerWidth < 845){
      this.canShowSearchAsOverlay = true;
    }else{
      this.canShowSearchAsOverlay = false;
    }
  }



  isMouseOver: boolean = false;

  changeIcon1(mouseOver: boolean) {
    this.isMouseOver = mouseOver;
  }
  

  //sobreposiciones de botones y solo usa el ngIf para controlar cual se muestrs


  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  isMenuOpen: boolean = false;

  onMenuOpened() {
    this.isMenuOpen = true;
    // Realiza acciones o lógica adicional cuando el menú se abre
  }

  onMenuClosed() {
    this.isMenuOpen = false;
    // Realiza acciones o lógica adicional cuando el menú se cierra
  }


  //Cerrar la sesion de la aplicacion

  OnclickLogout(){
    const navigationExtras: NavigationExtras = {
      state: {
        objeto: true
      }
    };
    
    this.router.navigate(['login'],navigationExtras);
  }

  iconLogout = true
  classIconLogout(){
    return this.iconLogout?'fa-door-closed':'fa-door-open'
  }

  clickLogout(){
    this.auth.logout()
  }

}