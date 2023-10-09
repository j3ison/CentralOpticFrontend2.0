import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ClientModule } from './client/client.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, LoginModule, DashboardModule, ComponentsRoutingModule, ClientModule
  ], 
  exports:[DashboardModule, LoginModule, ClientModule]
})
export class ComponentsModule { }
