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
import { BarCharComponent } from './graph/bar-char/bar-char.component';
// import { NgChartsModule } from 'ng2-charts';
import { NgChartsModule } from 'ng2-charts';

import { LineCharComponent } from './graph/line-char/line-char.component';
import { DonutCharComponent } from './graph/donut-char/donut-char.component';
import { PieCharComponent } from './graph/pie-char/pie-char.component';
import { AreaCharComponent } from './graph/area-char/area-char.component';



@NgModule({
  declarations: [DashboardComponent, BarCharComponent, LineCharComponent, DonutCharComponent, PieCharComponent, AreaCharComponent],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    ViewDataModule,
    NgChartsModule
  ], 
  exports:[DashboardComponent]
})
export class DashboardModule { }
