import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggingRoutingModule } from './logging-routing.module';
import { LoggingLayoutComponent } from './logging-layout/logging-layout.component';
import { LoggingPageComponent } from './pages/logging-page/logging-page.component';
import {NzLayoutModule} from 'ng-zorro-antd/layout';


@NgModule({
  declarations: [
    LoggingLayoutComponent,
    LoggingPageComponent
  ],
  imports: [
    CommonModule,
    LoggingRoutingModule,
    NzLayoutModule
  ]
})
export class LoggingModule { }
