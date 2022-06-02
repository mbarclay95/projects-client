import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksLayoutComponent } from './tasks-layout/tasks-layout.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskTabsComponent } from './pages/task-tabs/task-tabs.component';
import { FamiliesPageComponent } from './pages/families-page/families-page.component';
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzButtonModule} from "ng-zorro-antd/button";
import { CreateEditFamilyModalComponent } from './components/create-edit-family-modal/create-edit-family-modal.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import { FamiliesTableComponent } from './components/families-table/families-table.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NzSelectModule} from "ng-zorro-antd/select";
import { UsersToIdsPipe } from './pipes/users-to-ids.pipe';
import { CreateEditTaskModalComponent } from './components/create-edit-task-modal/create-edit-task-modal.component';
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";

@NgModule({
  declarations: [
    TasksLayoutComponent,
    TasksPageComponent,
    TaskTabsComponent,
    FamiliesPageComponent,
    CreateEditFamilyModalComponent,
    FamiliesTableComponent,
    UsersToIdsPipe,
    CreateEditTaskModalComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NzLayoutModule,
    NzTabsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
    NzTableModule,
    FontAwesomeModule,
    NzSelectModule,
    NzDatePickerModule,
    NzSwitchModule,
    NzRadioModule,
    NzInputNumberModule
  ]
})
export class TasksModule { }
