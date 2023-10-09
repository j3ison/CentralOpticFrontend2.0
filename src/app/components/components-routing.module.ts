import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from '../auth/guards/is-logged-in.guard';
import { hasRole } from '../auth/guards/has-role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientComponent } from './client/client.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PayComponent } from './pay/pay.component';
import { EyeExamComponent } from './eye-exam/eye-exam.component';
import { OrderComponent } from './order/order.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Admin', 'SuperAdmin'])],
    canLoad: [hasRole(['Admin', 'SuperAdmin'])]
  },{
    path :'client',
    component:ClientComponent,
    canActivate: [hasRole([ 'SuperAdmin','Admin','Optometrista','Vendedor'])],
    canLoad: [hasRole([ 'SuperAdmin','Admin','Optometrista','Vendedor'])]
  },{
    path :'employee',
    loadChildren:() => import('./employee/employee.module').then(m => m.EmployeeModule),
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Admin', 'SuperAdmin'])],
    canLoad: [hasRole(['Admin', 'SuperAdmin'])]
  },{
    path :'invoice',
    component:InvoiceComponent,
    canActivate: [hasRole([ 'SuperAdmin','Admin','Vendedor'])],
    canLoad: [hasRole([ 'SuperAdmin','Admin','Vendedor'])]
  },{
    path :'pay',
    component:PayComponent,
    canActivate: [hasRole([ 'SuperAdmin','Admin','Vendedor'])],
    canLoad: [hasRole([ 'SuperAdmin','Admin','Vendedor'])]
  },{
    path :'eye-exam',
    component:EyeExamComponent,
    canActivate: [hasRole([ 'SuperAdmin','Admin','Optometrista'])],
    canLoad: [hasRole([ 'SuperAdmin','Admin','Optometrista'])]
  },{
    path :'product',
    component:ProductComponent,
    canActivate: [hasRole([ 'SuperAdmin','Admin','Vendedor'])],
    canLoad: [hasRole([ 'SuperAdmin','Admin','Vendedor'])]
  },{
    path :'order',
    component:OrderComponent,
    canActivate: [hasRole([ 'SuperAdmin','Admin','Vendedor'])],
    canLoad: [hasRole([ 'SuperAdmin','Admin','Vendedor'])]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
