import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRoutingModule } from './product-routing.module';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ViewDataModule } from "../../modules/view-data/view-data.module";
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { SupplierComponent } from './supplier/supplier.component';
import {MatCardModule} from '@angular/material/card';
import { SupplierModule } from './supplier/supplier.module';

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatDialogModule,
    ViewDataModule,
    FormsModule,
    MatCardModule,
    SupplierModule
  ],
  providers: [DialogService],
})
export class ProductModule { }
