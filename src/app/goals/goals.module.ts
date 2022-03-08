import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { ListGoalsPageComponent } from './pages/list-goals-page/list-goals-page.component';
import { GoalsLayoutComponent } from './goals-layout/goals-layout.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import { GoalsTableComponent } from './components/goals-table/goals-table.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import { CreateEditGoalModalComponent } from './components/create-edit-goal-modal/create-edit-goal-modal.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzInputModule} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzInputNumberModule} from "ng-zorro-antd/input-number";


@NgModule({
  declarations: [
    ListGoalsPageComponent,
    GoalsLayoutComponent,
    GoalsTableComponent,
    CreateEditGoalModalComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
    NzLayoutModule,
    NzTableModule,
    NzButtonModule,
    NzModalModule,
    NzInputModule,
    FormsModule,
    NzSelectModule,
    NzInputNumberModule
  ]
})
export class GoalsModule { }
