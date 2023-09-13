import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CdkMenuModule } from '@angular/cdk/menu';
import { BrowserModule } from '@angular/platform-browser';
import { AuthModule } from 'src/app/auth/auth.module';
import { AuthService } from 'src/app/auth/auth.service';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [HeaderComponent],
  imports: [CdkMenuModule,BrowserModule,AuthModule,MatTooltipModule],
  exports:[HeaderComponent]
})
export class HeaderModule { }
