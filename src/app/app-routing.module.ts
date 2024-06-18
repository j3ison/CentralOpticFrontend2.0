import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { isLoggedInGuard } from './auth/guards/is-logged-in.guard';
import { hasRole } from './auth/guards/has-role.guard';
import { EmailServiceComponent } from './components/email-service/email-service.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'email-service', component: EmailServiceComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { 
    path: '', 
    loadChildren:() => import('./components/components.module').then(m => m.ComponentsModule),
    canMatch: [isLoggedInGuard]
  },
      

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
