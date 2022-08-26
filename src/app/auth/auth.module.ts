import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import {NzDividerModule} from "ng-zorro-antd/divider";


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    MyProfileComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzLayoutModule,
    NzButtonModule,
    NzSpinModule,
    ReactiveFormsModule,
    NzInputModule,
    NzDividerModule,
    FormsModule
  ]
})
export class AuthModule { }
