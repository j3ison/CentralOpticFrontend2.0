import { Component } from '@angular/core';
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
  
  isSidaNavCollapsed = false;
  screenWidth = 0;

  constructor(private auth:AuthService,private router: Router){}

  delete(){
    this.auth.logout();
  }

  onNavDesative():boolean{
    if(this.router.url=='/login'){
      return false
    }
    return true
  } 

  onToggleSideNav(data:SideNavToggle):void{
    this.isSidaNavCollapsed = data.collapsed
    this.screenWidth = data.screenWidth
  }

}
