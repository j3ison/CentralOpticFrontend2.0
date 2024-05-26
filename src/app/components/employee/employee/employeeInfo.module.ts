import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { TableModule } from "../../../modules/table/table.module";
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { MatInputModule } from '@angular/material/input';


@NgModule({
    declarations: [
        EmployeeComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        ViewDataModule,
        MatInputModule,
    ],
    exports:[EmployeeComponent]
})
export class EmployeeModule1 { }
