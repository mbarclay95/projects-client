import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksLayoutComponent } from './tasks-layout/tasks-layout.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { TaskTabsComponent } from './pages/task-tabs/task-tabs.component';
import { FamiliesPageComponent } from './pages/families-page/families-page.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CreateEditFamilyModalComponent } from './components/create-edit-family-modal/create-edit-family-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { FamiliesTableComponent } from './components/families-table/families-table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UsersToIdsPipe } from './pipes/users-to-ids.pipe';
import { CreateEditTaskModalComponent } from './components/create-edit-task-modal/create-edit-task-modal.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberLegacyModule } from 'ng-zorro-antd/input-number-legacy';
import { PluralFrequencyPipe } from './pipes/plural-frequency.pipe';
import { WeeklyProgressComponent } from './components/weekly-progress/weekly-progress.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { WeeklyProgressPercentPipe } from './pipes/weekly-progress-percent.pipe';
import { WeeklyProgressMessagePipe } from './pipes/weekly-progress-message.pipe';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskRowComponent } from './components/task-row/task-row.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { DueDateHumanReadablePipe } from './pipes/due-date-human-readable.pipe';
import { MyFamilyPageComponent } from './pages/my-family-page/my-family-page.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { MyFamilyEditFamilyComponent } from './components/my-family-edit-family/my-family-edit-family.component';
import { MyFamilyMembersComponent } from './components/my-family-members/my-family-members.component';
import { WeeklyTasksPageComponent } from './pages/weekly-tasks-page/weekly-tasks-page.component';
import { TasksTableComponent } from './components/tasks-table/tasks-table.component';
import { TasksFiltersComponent } from './components/tasks-filters/tasks-filters.component';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SharedModule } from '../shared/shared.module';
import { TaskTableMobileComponent } from './components/task-table-mobile/task-table-mobile.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzListModule } from 'ng-zorro-antd/list';
import { TotalCompletedTasksPipe } from './pipes/total-completed-tasks.pipe';
import { CreateEditTaskModalMobileComponent } from './components/create-edit-task-modal-mobile/create-edit-task-modal-mobile.component';
import { TaskPointColorPipe } from './pipes/task-point-color.pipe';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { UpdatingTaskPointColorsPipe } from './pipes/updating-task-point-colors.pipe';
import { SelectedTaskPointColorPipe } from './pipes/selected-task-point-color.pipe';
import { WeekSelectorComponent } from './components/week-selector/week-selector.component';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { WeeklyTasksSegmentComponent } from './components/weekly-tasks-segment/weekly-tasks-segment.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { StatsPageComponent } from './pages/stats-page/stats-page.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { ViewTaskModalComponent } from './components/view-task-modal/view-task-modal.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SkipTaskModalComponent } from './components/skip-task-modal/skip-task-modal.component';
import { FrequencyToStringPipe } from './pipes/frequency-to-string.pipe';
import { YearSelectorComponent } from './components/year-selector/year-selector.component';
import { FamilyMemberStatsComponent } from './components/family-member-stats/family-member-stats.component';

@NgModule({
  declarations: [
    TasksLayoutComponent,
    TasksPageComponent,
    TaskTabsComponent,
    FamiliesPageComponent,
    CreateEditFamilyModalComponent,
    FamiliesTableComponent,
    UsersToIdsPipe,
    CreateEditTaskModalComponent,
    PluralFrequencyPipe,
    WeeklyProgressComponent,
    WeeklyProgressPercentPipe,
    WeeklyProgressMessagePipe,
    TasksListComponent,
    TaskRowComponent,
    DueDateHumanReadablePipe,
    MyFamilyPageComponent,
    MyFamilyEditFamilyComponent,
    MyFamilyEditFamilyComponent,
    MyFamilyMembersComponent,
    WeeklyTasksPageComponent,
    TasksTableComponent,
    TasksFiltersComponent,
    TaskTableMobileComponent,
    TotalCompletedTasksPipe,
    CreateEditTaskModalMobileComponent,
    TaskPointColorPipe,
    UpdatingTaskPointColorsPipe,
    SelectedTaskPointColorPipe,
    WeekSelectorComponent,
    WeeklyTasksSegmentComponent,
    StatsPageComponent,
    ViewTaskModalComponent,
    SkipTaskModalComponent,
    FrequencyToStringPipe,
    YearSelectorComponent,
    FamilyMemberStatsComponent,
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
    NzInputNumberLegacyModule,
    NzProgressModule,
    NzDividerModule,
    NzCheckboxModule,
    NzPopoverModule,
    NzPopconfirmModule,
    SharedModule,
    NzEmptyModule,
    NzListModule,
    NzSpaceModule,
    NzSegmentedModule,
    NzBadgeModule,
    NzDropDownModule,
    NzSpinModule,
  ],
})
export class TasksModule {}
