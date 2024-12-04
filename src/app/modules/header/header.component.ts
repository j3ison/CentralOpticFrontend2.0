import { Component, EventEmitter, HostListener, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { EventBtnClick, HeaderData, HeaderSearch } from './header-data';
import { userItems } from './header-dummy-data';
// import { CdkMenuTrigger } from '@angular/cdk/overlay';
import { MatMenuTrigger } from '@angular/material/menu';

import { CdkMenuTrigger } from '@angular/cdk/menu';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { HeaderService } from './service/header.service';
import { filter } from 'rxjs/operators';
import { navbarData } from '../sidenav/nav-data';
import { Role } from 'src/app/auth/model';
import { NotificationService } from 'src/app/components/product/service/notification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderSearch]
})
export class HeaderComponent implements OnInit {


  userItems = userItems;
  iconClassLogout: string = 'fa-solid fa-door-closed';


  // Esta variable se utiliza para hacer la animacion de la barra de buscar 
  canShowSearchAsOverlay = false
  // Al inicio del programa se utiliza para marcar en que opcion (tablas / form) se inicia


  // Extrae a tiempo real lo que se escriba en el input
  title: string = '';
  navData = navbarData;

  // se usa para que sea response (no tocar XD)
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  // Para obtener el tamaño la pantalla de windows 
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkCanShowSearchAsOverlay(window.innerWidth);
  }

  roleNotification: Role[] = ['Super Administrador', 'Venta', 'Administrador'];
  // notificacionEnable:boolean = false
  notificationItems: any[] | null = null


  constructor(private headerService: HeaderService,
    public router: Router,
    private auth: AuthService,
    private renderer: Renderer2,
    private notificacion: NotificationService
  ) {

  }

  ngOnInit() {
    // this.checkCanShowSearchAsOverlay(window.innerWidth);
    // this.headerService.title$.subscribe(title => {
    //   this.title = title;
    // });
    this.notificacion.monitorStockChanges()

    this.notificacion.notification$.subscribe(item => {
      this.notificationItems = item
    })

    this.renderer.addClass(document.body, 'reduced-height');
  }

  iconNotificacion() {
    // console.log(this.notificationItems?.length)
    if (this.notificationItems) {
      const stv = this.notificationItems.length > 9 ? '+' : ' '
      return this.notificationItems.length.toString() + stv
    }
    return ''
  }




  // para modificar clases (no tocar XD)
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 834) {
      styleClass = 'head-trimmed';
    } else if (!this.collapsed && this.screenWidth <= 835 && this.screenWidth > 0) {
      styleClass = 'head-md-screen'
    }
    return styleClass;
  }

  // para modificar clases (no tocar XD)
  checkCanShowSearchAsOverlay(innerWidth: number): void {
    if (innerWidth < 845) {
      this.canShowSearchAsOverlay = true;
    } else {
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

  OnclickLogout() {
    const navigationExtras: NavigationExtras = {
      state: {
        objeto: true
      }
    };

    this.router.navigate(['login'], navigationExtras);
  }

  iconLogout = true
  classIconLogout() {
    return this.iconLogout ? 'fa-door-closed' : 'fa-door-open'
  }

  clickLogout() {
    this.auth.logout()
  }

  // setTitle(){
  //   // console.log(this.navData.find(d=>d.routeLink === )?.label)
  //   return this.navData.find((obj) => obj.routeLink === this.router.url.slice(1))?.label
  // }

  setTitle(routeLink: string): string | undefined {
    const buscarLabel = (items: any[]): string | undefined => {
      for (const item of items) {
        if (item.routeLink === routeLink) {
          return item.label;
        }
        if (item.items) {
          const resultado = buscarLabel(item.items);
          if (resultado) {
            return resultado;
          }
        }
      }
      return undefined;
    };

    return buscarLabel(this.navData);
  }

}