import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { UserComponent } from './user/user.component';
import { isLoggedInGuard } from 'src/app/auth/guards/is-logged-in.guard';
import { hasRole } from 'src/app/auth/guards/has-role.guard';

const routes: Routes = [
  {
    path: 'employee',
    component:EmployeeComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Administrador', 'Super Administrador'])],
    canLoad: [hasRole(['Administrador', 'Super Administrador'])]
  },{
    path :'user',
    component:UserComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole([ 'Super Administrador'])],
    canLoad: [hasRole([ 'Super Administrador'])]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
