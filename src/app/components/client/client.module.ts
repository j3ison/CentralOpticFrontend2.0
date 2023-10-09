import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ViewDataModule } from 'src/app/modules/view-data/view-data.module';



@NgModule({
  declarations: [
    ClientComponent
  ],
  imports: [
    CommonModule,
    ViewDataModule
  ],
  exports:[ClientComponent]
})
export class ClientModule { }
