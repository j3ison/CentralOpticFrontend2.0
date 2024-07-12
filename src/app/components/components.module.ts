import { NgModule } from '@angular/core';
import { ProviderModule} from './provider/provider.module';
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
import { LabModule } from './lab/lab.module';
import { EyeExamModule } from './eye-exam/eye-exam.module';
import { EmailServiceComponent } from './email-service/email-service.component';
import { EmailServiceModule } from './email-service/email-service.module';
import { ChangePasswordModule } from './change-password/change-password.module';
import { EmployeeModule } from './employee/employee.module';
import { AssistModule } from './assist/assist.module';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginModule, 
    DashboardModule, 
    ComponentsRoutingModule, 
    ClientModule, 
    InvoiceModule, 
    ProductModule, 
    InventoryModule, 
    AddModule, 
    ListModule, 
    AddRegisterModule, 
    RegisterProductModule,
    PayModule,
    ProviderModule,
    LabModule,
    ChangePasswordModule,
    AssistModule,
    OrderModule
  ],
  exports: [DashboardModule, 
    LoginModule, 
    ClientModule, 
    InvoiceModule, 
    ProductModule, 
    InventoryModule, 
    AddModule, 
    ListModule, 
    AddRegisterModule, 
    RegisterProductModule,
    PayModule,ProviderModule,
    LabModule,
    EyeExamModule,
    EmailServiceModule,
    ChangePasswordModule,
    EmployeeModule,
    AssistModule,
    OrderModule
  ],
  providers: [DialogService],
})
export class ComponentsModule { }
