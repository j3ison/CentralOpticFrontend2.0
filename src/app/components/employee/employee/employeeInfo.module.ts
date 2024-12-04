import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeComponent } from './employee.component';
import { TableModule } from "../../../modules/table/table.module";
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
    declarations: [
        EmployeeComponent
    ],
    imports: [
        CommonModule,
        TableModule,
        ViewDataModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatDividerModule,
        MatStepperModule,
        MatTooltipModule 
    ],
    exports:[EmployeeComponent]
})
export class EmployeeModule1 { }
