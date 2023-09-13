import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.items && data.items.length > 0"
    [@submenu]="expanded
      ? {value: 'visible', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
      : {value: 'hidden', 
          params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}"
      class="sublevel-nav"
    >
      <li *ngFor="let item of data.items" class="sublevel-nav-item">

      <div *akoShowForRoles="item.role">
        <a class="sublevel-nav-link"
        (click)="handleClick(item)"
          *ngIf="item.items && item.items.length > 0"
          [ngClass]="getActiveClass(item)"
          >
          <i class="sublevel-link-icon fa fa-circle" [ngClass]="item.icon ? item.icon : 'fa-solid fa-circle'"]></i>
          <span class="sublevel-link-text" @fadeInOut 
              *ngIf="collapsed">{{item.label}}</span>
          <i *ngIf="item.items && collapsed" class="menu-collapse-icon"
            [ngClass]="!item.expanded ? 'fal fa-angle-right' : 'fal fa-angle-down'"
          ></i>
        </a>
        <a class="sublevel-nav-link"
          *ngIf="!item.items || (item.items && item.items.length === 0)"
          [routerLink]="[item.routeLink]"
          routerLinkActive="active-sublevel"
          [routerLinkActiveOptions]="{exact: true}"
        >
        <!-- <i class="fa-solid fa-circle"></i>-->
          <i  [ngClass]="item.icon ? item.icon : 'fa-solid fa-circle'"></i>
          <span class="sublevel-link-text" @fadeInOut 
             *ngIf="collapsed">{{item.label}}</span>
        </a>
        <div *ngIf="item.items && item.items.length > 0">
          <app-sublevel-menu
            [data]="item"
            [collapsed]="collapsed"
            [multiple]="multiple"
            [expanded]="item.expanded"
          ></app-sublevel-menu>
      </div>
          </div>
      </li>
    </ul>

<!--     
    <ng-template #menuOverlay let-item="item">
        <ng-container *cdkMenuItemTemplate="let item">
            <app-sublevel-menu [data]="item" [collapsed]="true" [multiple]="multiple" [expanded]="item.expanded">
            </app-sublevel-menu>
        </ng-container>
    </ng-template> -->
  `,
  styleUrls: ['./sidenav.component.css'],
  animations: [
    fadeInOut,
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({ overflow: 'hidden' }),
      animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent {

  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router) { }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modeItem of this.data.items) {
          if (item !== modeItem && modeItem.expanded) {
            modeItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url.includes(item.routeLink)
      ? 'active-sublevel'
      : '';
  }

  getIcon(item: INavbarData) {
    return item.icon?.length !== 0 ? item.icon : ''
  }


  // @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  // isMenuOpen: boolean = false;

  // onMenuOpened(menu: any) {
  //   console.log('entro')
  //   this.isMenuOpen = true;
  //   // Realiza acciones o lógica adicional cuando el menú se abre
  // }

  // onMenuClosed() {
  //   this.isMenuOpen = false;
  //   // Realiza acciones o lógica adicional cuando el menú se cierra
  // }

}