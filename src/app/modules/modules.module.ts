import { NgModule } from '@angular/core';
import { SidenavModule } from './sidenav/sidenav.module';
import { HeaderModule } from './header/header.module';
import { BodyModule } from './body/body.module';



@NgModule({
  declarations: [
    
  ],
  imports: [],
  exports: [SidenavModule, HeaderModule, BodyModule]
})
export class ModulesModule { }
