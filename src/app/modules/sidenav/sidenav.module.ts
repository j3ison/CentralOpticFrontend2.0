import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { SublevelMenuComponent } from './sublevel-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthModule } from 'src/app/auth/auth.module';
import { CdkMenuModule } from '@angular/cdk/menu';


@NgModule({
  declarations: [SidenavComponent,SublevelMenuComponent],
  imports: [BrowserModule,AppRoutingModule,MatTooltipModule,AuthModule,CdkMenuModule],
  exports:[SidenavComponent , SublevelMenuComponent]
})
export class SidenavModule { }
