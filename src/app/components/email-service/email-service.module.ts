import { NgModule } from '@angular/core';
import { EmailServiceComponent } from './email-service.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [EmailServiceComponent],
  imports: [
    CommonModule,
    
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    FormsModule
  ]
})
export class EmailServiceModule { }
