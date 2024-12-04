import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import { InvoiceModule } from "../../invoice/invoice.module";

// import { MatCardModule } from '@angular/material/card';



@NgModule({
    declarations: [
        UserComponent
    ],
    exports: [UserComponent],
    imports: [
        CommonModule,
        ViewDataModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatCardModule,
        ReactiveFormsModule,
        FormsModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatDividerModule,
        MatStepperModule,
        MatTooltipModule,
        InvoiceModule
    ]
})
export class UserModule { }
