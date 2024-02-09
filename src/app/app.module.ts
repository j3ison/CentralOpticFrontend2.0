import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { ModulesModule } from './modules/modules.module';
import { ComponentsModule } from './components/components.module';
import { DialogModule } from '@angular/cdk/dialog';
import { InventoryComponent } from './components/product/inventory/inventory.component';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AuthModule,
        OverlayModule,
        ModulesModule,
        ComponentsModule,
        FormsModule,
        NgxPaginationModule
    ]
})
export class AppModule { }
