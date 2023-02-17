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
import {SharedModule} from '../shared/shared.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import { GoalStatsPageComponent } from './pages/goal-stats-page/goal-stats-page.component';
import { GoalsTableMobileComponent } from './components/goals-table-mobile/goals-table-mobile.component';
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import { GoalDayButtonComponent } from './components/goal-day-button/goal-day-button.component';
import { PluralizeGoalPipe } from './pipes/pluralize-goal.pipe';
import { GoalDaysPipe } from './pipes/goal-days.pipe';
import {NzSpaceModule} from 'ng-zorro-antd/space';


@NgModule({
  declarations: [
    ListGoalsPageComponent,
    GoalsLayoutComponent,
    GoalsTableComponent,
    CreateEditGoalModalComponent,
    GoalStatsPageComponent,
    GoalsTableMobileComponent,
    GoalDayButtonComponent,
    PluralizeGoalPipe,
    GoalDaysPipe
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
    NzInputNumberModule,
    SharedModule,
    FontAwesomeModule,
    NzPopconfirmModule,
    NzPopoverModule,
    NzSpaceModule
  ]
})
export class GoalsModule { }
