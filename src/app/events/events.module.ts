import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsLayoutComponent } from './events-layout/events-layout.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { EventsPageComponent } from './pages/events-page/events-page.component';
import { EventsTableComponent } from './components/events-table/events-table.component';
import { EventsFiltersComponent } from './components/events-filters/events-filters.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import { CreateEditEventComponent } from './components/create-edit-event/create-edit-event.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {AngularEditorModule} from "@kolkov/angular-editor";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";


@NgModule({
  declarations: [
    EventsLayoutComponent,
    EventsPageComponent,
    EventsTableComponent,
    EventsFiltersComponent,
    CreateEditEventComponent
  ],
    imports: [
        CommonModule,
        EventsRoutingModule,
        NzLayoutModule,
        NzInputModule,
        FormsModule,
        NzSwitchModule,
        NzButtonModule,
        NzTableModule,
        FontAwesomeModule,
        NzCollapseModule,
        NzModalModule,
        NzDatePickerModule,
        NzInputNumberModule,
        AngularEditorModule,
        NzToolTipModule,
        NzProgressModule,
        NzPopconfirmModule,
        NzCheckboxModule,
    ]
})
export class EventsModule { }
