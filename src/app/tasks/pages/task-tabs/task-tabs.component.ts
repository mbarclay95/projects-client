import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../../models/task.model';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { NzTabsComponent, NzTabComponent, NzTabLinkTemplateDirective, NzTabLinkDirective } from 'ng-zorro-antd/tabs';
import { RouterLink } from '@angular/router';
import { WeeklyTasksPageComponent } from '../weekly-tasks-page/weekly-tasks-page.component';
import { MyFamilyPageComponent } from '../my-family-page/my-family-page.component';
import { TasksPageComponent } from '../tasks-page/tasks-page.component';
import { FamiliesPageComponent } from '../families-page/families-page.component';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { CreateEditTaskModalMobileComponent } from '../../components/create-edit-task-modal-mobile/create-edit-task-modal-mobile.component';
import { ViewTaskModalComponent } from '../../components/view-task-modal/view-task-modal.component';
import { SkipTaskModalComponent } from '../../components/skip-task-modal/skip-task-modal.component';

@Component({
  selector: 'app-task-tabs',
  templateUrl: './task-tabs.component.html',
  styleUrls: ['./task-tabs.component.scss'],
  imports: [
    NzTabsComponent,
    NzTabComponent,
    NzTabLinkTemplateDirective,
    NzTabLinkDirective,
    RouterLink,
    WeeklyTasksPageComponent,
    MyFamilyPageComponent,
    TasksPageComponent,
    FamiliesPageComponent,
    NzButtonComponent,
    CreateEditTaskModalMobileComponent,
    ViewTaskModalComponent,
    SkipTaskModalComponent,
  ],
})
export class TaskTabsComponent implements OnInit {
  selectedTab: 'Task' | 'Family' | 'My Family' = 'Task';
  openSkipTaskModal: Subject<Task> = new Subject<Task>();
  openViewTaskModal: Subject<Task> = new Subject<Task>();

  readonly authStore = inject(AuthSignalStore);
  readonly familiesStore = inject(FamiliesSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);

  ngOnInit(): void {
    this.loadWeeklyTasks();
  }

  loadWeeklyTasks() {
    this.selectedTab = 'Task';
    this.tasksStore.loadWeeklyPage();
    this.taskUserConfigsStore.resetWeekOffset();
  }

  loadTasksTable() {
    this.selectedTab = 'Task';
    this.tasksStore.loadTasksPage();
    this.taskUserConfigsStore.resetWeekOffset();
  }

  createEntity() {
    switch (this.selectedTab) {
      case 'Family':
        this.familiesStore.createEntity();
        break;
      case 'Task':
        this.tasksStore.createEntity({
          ownerId: this.familiesStore.activeFamilyId(),
          taskPoint: this.familiesStore.minTaskPoint(),
        });
        break;
    }
  }
}
