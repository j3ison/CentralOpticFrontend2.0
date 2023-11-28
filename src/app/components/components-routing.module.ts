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
//import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component:DashboardComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Administrador', 'Super Administrador'])],
    canLoad: [hasRole(['Administrador', 'Super Administrador'])]
  },{
    path :'client',
    component:ClientComponent,
    canActivate: [hasRole([ 'Super Administrador','Administrador','Optometrista','Venta'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Optometrista','Venta'])]
  },{
    path :'employee',
    loadChildren:() => import('./employee/employee.module').then(m => m.EmployeeModule),
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Administrador', 'Super Administrador'])],
    canLoad: [hasRole(['Administrador', 'Super Administrador'])]
  },{
    path :'invoice',
    component:InvoiceComponent,
    canActivate: [hasRole([ 'Super Administrador','Administrador','Venta'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Venta'])]
  },{
    path :'pay',
    component:PayComponent,
    canActivate: [hasRole([ 'Super Administrador','Administrador','Venta'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Venta'])]
  },{
    path :'eye-exam',
    component:EyeExamComponent,
    canActivate: [hasRole([ 'Super Administrador','Administrador','Optometrista'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Optometrista'])]
  },{
    path :'product',
    loadChildren:() => import('./product/product.module').then(m => m.ProductModule),
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole([ 'Super Administrador','Administrador','Venta'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Venta'])]
  },
  {
    path :'register-product',
    loadChildren:() => import('./register-product/register-product.module').then(m => m.RegisterProductModule),
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole([ 'Super Administrador','Administrador','Venta'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Venta'])]
  },
  
  {
    path :'order',
    component:OrderComponent,
    canActivate: [hasRole([ 'Super Administrador','Administrador','Venta'])],
    canLoad: [hasRole([ 'Super Administrador','Administrador','Venta'])]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
