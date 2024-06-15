import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { RollModule } from './roll/roll.module';
import { ProfileModule } from './profile/profile.module';
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { EmployeeModule1 } from './employee/employeeInfo.module';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatDialogModule,
    RollModule, 
    ProfileModule,
    ViewDataModule,
    EmployeeModule1
  ],
  providers: [DialogService],
})
export class EmployeeModule { }
