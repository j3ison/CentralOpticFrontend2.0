import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewDataComponent } from './view-data.component';
import { TableModule } from "../table/table.module";
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
    declarations: [ViewDataComponent],
    exports: [ViewDataComponent],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        TableModule,
        MatProgressBarModule
    ]
})
export class ViewDataModule { }
