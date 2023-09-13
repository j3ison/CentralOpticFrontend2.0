import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { SidenavModule } from './sidenav/sidenav.module';
import { HeaderModule } from './header/header.module';
import { BodyModule } from './body/body.module';



@NgModule({
  declarations: [
  ],
  imports: [SidenavModule, HeaderModule, BodyModule],
  exports: [
    SidenavModule,
    HeaderComponent,
    BodyModule
  ]
})
export class ModulesModule { }
