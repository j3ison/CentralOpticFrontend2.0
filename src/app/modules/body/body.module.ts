import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BodyComponent } from './body.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    BodyComponent
  ],
  imports: [BrowserModule,CommonModule,AppRoutingModule],
  exports:[BodyComponent]
})
export class BodyModule { }
