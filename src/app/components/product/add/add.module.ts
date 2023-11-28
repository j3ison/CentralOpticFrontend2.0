import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddComponent } from './add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatCardModule } from '@angular/material/card';

@NgModule({
    declarations: [
        AddComponent,
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        ViewDataModule,
        FormsModule,
        ReactiveFormsModule 
    ], 
    exports:[AddComponent]
})
export class AddModule { }