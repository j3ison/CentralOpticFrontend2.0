import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { TableModule } from "../../../modules/table/table.module";



@NgModule({
    declarations: [
        EmployeeComponent
    ],
    imports: [
        CommonModule,
        TableModule
    ]
})
export class EmployeeModule { }
