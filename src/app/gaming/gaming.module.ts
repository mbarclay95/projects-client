import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GamingRoutingModule } from './gaming-routing.module';
import {NzModalModule} from 'ng-zorro-antd/modal';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    GamingRoutingModule,
    NzModalModule,
  ]
})
export class GamingModule { }
