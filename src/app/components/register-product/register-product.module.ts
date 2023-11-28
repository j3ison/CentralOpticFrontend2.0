import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewDataModule } from "../../modules/view-data/view-data.module";
import { FormsModule } from '@angular/forms';
import { RegisterProductRoutingModule } from './register-product-routing.module';

@NgModule({
    declarations: [ 
  ],
    imports: [
        CommonModule,
        RegisterProductRoutingModule,
        MatDialogModule,
        ViewDataModule,
        FormsModule
    ],
    providers: [DialogService],
})
export class RegisterProductModule { }