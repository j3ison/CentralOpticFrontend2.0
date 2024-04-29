import { Component, Output, EventEmitter, OnInit, HostListener, ViewChild } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, animation, keyframes, style, transition, trigger } from '@angular/animations';
import { INavbarData, fadeInOut } from './helper';
import { NavigationEnd, NavigationExtras, Router } from '@angular/router';
import { HeaderService } from '../header/service/header.service';
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' })
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {
  
  


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = navbarData;
  multiple: boolean = false;
  name: string = ''

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    }
  }

  constructor(public router: Router, private headerService: HeaderService, private authService: AuthService,private auth:AuthService) { }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;

    this.subscribeToRouteChanges();

    this.authService.user$.subscribe(user => {
      this.name = user?.username ? user?.username : ''
    })
  }

  private subscribeToRouteChanges() {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log(event.url.substring(1))
        // this.detectRouteChange(this.navData,event.url.substring(1));
        // const match = event.url.match(/\/([^/]+)$/)!!;
        // console.log(event.url.substring(1))
        // console.log(this.navData)

        // this.headerService.setTitle(String(this.navData.find(e => e.routeLink===event.url.substring(1) || e?.items?.find(e =>e.routeLink === event.url.substring(1)))?.label))
      }
    });
  }



  detectRouteChange(data: any[], datab: string) {
    data.forEach(data => {
      if (data.items && data.items.length > 0) {
        this.detectRouteChange(data.items, datab);
      }

      if (!data.items && data.routeLink === datab) {
        this.headerService.setTitle(data.label);
        return
      }
    })
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      this.headerService.setTitle(item.label);
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  navSublevelMenu(collapse: boolean): string {
    if (!collapse)
      return 'sidenav-sublevel-collapsep';
    return '';
  }

  navTooltipText(text: string) {
    return !this.collapsed ? text : ''
  }

  OnclickLogout() {
    const navigationExtras: NavigationExtras = {
      state: {
        objeto: true
      }
    };

    this.router.navigate(['login'], navigationExtras);
  }

  clickLogout(){
    this.toggleCollapse()
    this.auth.logout()
  }

  isMenuOpen: boolean = false;

  onMenuOpened() {
    this.isMenuOpen = true;
  }

  onMenuClosed() {
    this.isMenuOpen = false;
  }
}
