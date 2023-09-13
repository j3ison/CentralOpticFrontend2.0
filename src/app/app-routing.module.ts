import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { hasRole } from './auth/guards/has-role.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canMatch: [isLoggedInGuard],
    canActivate: [hasRole([ 'Manager','Bodega','Vendedor'])],
    canLoad: [hasRole([ 'Manager','Bodega','Vendedor'])],
  },
      

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
