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
import { ProductModule } from './product/product.module';
import { InventoryModule } from './product/inventory/inventory.module';
import { AddModule } from './product/add/add.module';
import { ListModule } from './register-product/list/list.module';
import { AddRegisterModule } from './register-product/add-register/add-register.module';
import { RegisterProductModule } from './register-product/register-product.module';
import { PayModule } from './pay/pay.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    LoginModule, 
    DashboardModule, 
    ComponentsRoutingModule, 
    ClientModule, 
    UserModule, 
    InvoiceModule, 
    ProductModule, 
    InventoryModule, 
    AddModule, 
    ListModule, 
    AddRegisterModule, 
    RegisterProductModule,
    PayModule
  ],
  exports: [DashboardModule, LoginModule, ClientModule, UserModule, InvoiceModule, ProductModule, InventoryModule, AddModule, ListModule, AddRegisterModule, RegisterProductModule,PayModule],
  providers: [DialogService],
})
export class ComponentsModule { }
