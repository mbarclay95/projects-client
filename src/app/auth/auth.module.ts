import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent
  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        NzLayoutModule,
        NzButtonModule
    ]
})
export class AuthModule { }
