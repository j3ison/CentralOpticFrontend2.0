import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceComponent } from './invoice.component';
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubTabletComponent } from './modules/sub-tablet/sub-tablet.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    InvoiceComponent,
    SubTabletComponent
  ],
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
    MatStepperModule
  ]
})
export class InvoiceModule { }
