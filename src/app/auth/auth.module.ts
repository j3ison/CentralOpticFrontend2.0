import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowForRolesDirective } from './directives/show-for-roles.directive';



@NgModule({
  declarations: [ShowForRolesDirective],
  imports: [],
  exports: [ShowForRolesDirective],
})
export class AuthModule { }
