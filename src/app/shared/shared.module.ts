import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgLetDirective} from './directives/ng-let.directive';
import {FirstNamePipe} from './pipes/first-name.pipe';
import {MobileFooterComponent} from './components/mobile-footer/mobile-footer.component';
import {SideMenuComponent} from './components/side-menu/side-menu.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterModule} from "@angular/router";
import {LongPressDirective} from './directives/long-press.directive';
import {PageHeaderComponent} from './components/page-header/page-header.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { DefaultModalComponent } from './components/default-modal/default-modal.component';
import { DisplayRoleNamePipe } from './pipes/display-role-name.pipe';
import { HasRolePipe } from './pipes/has-role.pipe';

@NgModule({
  declarations: [
    NgLetDirective,
    LongPressDirective,
    FirstNamePipe,
    MobileFooterComponent,
    SideMenuComponent,
    PageHeaderComponent,
    DefaultModalComponent,
    DisplayRoleNamePipe,
    HasRolePipe,
  ],
  exports: [
    NgLetDirective,
    LongPressDirective,
    FirstNamePipe,
    SideMenuComponent,
    MobileFooterComponent,
    PageHeaderComponent,
    DisplayRoleNamePipe,
    HasRolePipe,
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    FontAwesomeModule,
    RouterModule,
    NzButtonModule,
  ]
})
export class SharedModule {
}
