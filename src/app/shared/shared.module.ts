import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgLetDirective } from './directives/ng-let.directive';
import { FirstNamePipe } from './pipes/first-name.pipe';
import { MobileFooterComponent } from './components/mobile-footer/mobile-footer.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    NgLetDirective,
    FirstNamePipe,
    MobileFooterComponent,
    SideMenuComponent
  ],
  exports: [
    NgLetDirective,
    FirstNamePipe,
    SideMenuComponent,
    MobileFooterComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    FontAwesomeModule,
    RouterModule
  ]
})
export class SharedModule { }
