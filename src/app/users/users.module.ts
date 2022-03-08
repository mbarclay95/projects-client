import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersLayoutComponent } from './users-layout/users-layout.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { UserTableComponent } from './components/user-table/user-table.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    UsersPageComponent,
    UsersLayoutComponent,
    UserTableComponent
  ],
    imports: [
        CommonModule,
        UsersRoutingModule,
        NzLayoutModule,
        NzTableModule,
        NzButtonModule
    ]
})
export class UsersModule { }
