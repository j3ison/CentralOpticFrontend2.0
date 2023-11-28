import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from 'src/app/auth/guards/is-logged-in.guard';
import { hasRole } from 'src/app/auth/guards/has-role.guard';
import { ListComponent } from './list/list.component';
import { AddRegisterComponent } from './add-register/add-register.component';

const routes: Routes = [
  {
    path: 'list',
    component:ListComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Administrador', 'Super Administrador'])],
    canLoad: [hasRole(['Administrador', 'Super Administrador'])]
  },{
    path :'addRegister',
    component:AddRegisterComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole([ 'Administrador','Super Administrador'])],
    canLoad: [hasRole([ 'Administrador','Super Administrador'])]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterProductRoutingModule { }