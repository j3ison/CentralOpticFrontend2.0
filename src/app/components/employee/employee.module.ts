import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { EmployeeModule1 } from './employee/employee.module';
import { RollModule } from './roll/roll.module';
import { ProfileModule } from './profile/profile.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatDialogModule,
    EmployeeModule1,
    RollModule, 
    ProfileModule
  ],
  providers: [DialogService],
})
export class EmployeeModule { }
