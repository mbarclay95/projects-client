import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventSignupRoutingModule } from './event-signup-routing.module';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import {NzResultModule} from "ng-zorro-antd/result";
import { EventSignupLayoutComponent } from './event-signup-layout/event-signup-layout.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { EventParticipantModalComponent } from './components/event-participant-modal/event-participant-modal.component';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    NotFoundPageComponent,
    EventPageComponent,
    EventSignupLayoutComponent,
    EventParticipantModalComponent
  ],
  imports: [
    CommonModule,
    EventSignupRoutingModule,
    NzResultModule,
    NzLayoutModule,
    NzButtonModule,
    NzModalModule,
    FormsModule,
    NzInputModule,
    NzDividerModule,
    NzRadioModule,
    FontAwesomeModule,
    SharedModule,
  ]
})
export class EventSignupModule { }
