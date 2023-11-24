import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeRoutingModule } from './employee-routing.module';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    MatDialogModule
  ],
  providers: [DialogService],
})
export class EmployeeModule { }
