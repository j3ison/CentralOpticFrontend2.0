import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayComponent } from './pay.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TableModule } from 'src/app/modules/table/table.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    PayComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    TableModule,
    MatProgressBarModule,
    MatDividerModule
  ],
  exports:[
    PayComponent
  ]
})
export class PayModule { }
