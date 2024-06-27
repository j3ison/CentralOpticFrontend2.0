import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {  MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    ViewDataModule
  ], 
  exports:[DashboardComponent]
})
export class DashboardModule { }
