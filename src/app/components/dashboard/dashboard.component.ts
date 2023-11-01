import { Component, HostListener } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  
  // data = [
  //   {nombre:'Amanda Flores Castillo',cedula:'',edad:'100-091023-00055',direccion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, optio.'},
  //   {nombre:'Amanda Flores Castillo',cedula:'',edad:'100-091023-00055',direccion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, optio.'},
  //   {nombre:'Amanda Flores Castillo',cedula:'',edad:'100-091023-00055',direccion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, optio.'},
  //   {nombre:'Amanda Flores Castillo',cedula:'',edad:'100-091023-00055',direccion:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, optio.'} 
  // ]

}
