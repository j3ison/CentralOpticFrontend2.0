import { animate, style, transition, trigger } from "@angular/animations";
import { Role } from "src/app/auth/model";

export interface INavbarData{
    routeLink: string;
    icon?:string;
    label:string;
    expanded?:boolean;
    items?: INavbarData[];
    role?:Role[];
}

export const fadeInOut = trigger('fadeInOut', [
    transition(':enter', [
      style({opacity: 0}),
      animate('350ms',
        style({opacity: 1})
      )
    ]),
    transition(':leave', [
      style({opacity: 1}),
      animate('350ms',
        style({opacity: 0})
      )
    ])
  ])