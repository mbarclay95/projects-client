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

@NgModule({
  declarations: [
    TasksLayoutComponent,
    TasksPageComponent,
    TaskTabsComponent,
    FamiliesPageComponent,
    CreateEditFamilyModalComponent
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    NzLayoutModule,
    NzTabsModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    FormsModule
  ]
})
export class TasksModule { }
