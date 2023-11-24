import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginModule } from './login/login.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ComponentsRoutingModule } from './components-routing.module';
import { ClientModule } from './client/client.module';
import { UserModule } from './employee/user/user.module';
import { InvoiceModule } from './invoice/invoice.module';
import { DialogService } from '../modules/dialog/service/dialog.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, LoginModule, DashboardModule, ComponentsRoutingModule, ClientModule,UserModule,InvoiceModule
  ], 
  exports:[DashboardModule, LoginModule, ClientModule,UserModule,InvoiceModule],
  providers: [DialogService],
})
export class ComponentsModule { }
