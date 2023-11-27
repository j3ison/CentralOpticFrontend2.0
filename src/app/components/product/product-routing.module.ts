import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from 'src/app/auth/guards/is-logged-in.guard';
import { hasRole } from 'src/app/auth/guards/has-role.guard';
import { InventoryComponent } from './inventory/inventory.component';

const routes: Routes = [
  {
    path: 'inventory',
    component:InventoryComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole(['Administrador', 'Super Administrador'])],
    canLoad: [hasRole(['Administrador', 'Super Administrador'])]
  },{
    path :'add',
    component:InventoryComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole([ 'Super Administrador'])],
    canLoad: [hasRole([ 'Super Administrador'])]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }