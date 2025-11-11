import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { isMobile } from '../../../app.component';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { TasksFiltersComponent } from '../../components/tasks-filters/tasks-filters.component';
import { TaskTableMobileComponent } from '../../components/task-table-mobile/task-table-mobile.component';
import { TasksTableComponent } from '../../components/tasks-table/tasks-table.component';
import { CreateEditTaskModalMobileComponent } from '../../components/create-edit-task-modal-mobile/create-edit-task-modal-mobile.component';
import { ViewTaskModalComponent } from '../../components/view-task-modal/view-task-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss'],
  imports: [
    TasksFiltersComponent,
    TaskTableMobileComponent,
    TasksTableComponent,
    CreateEditTaskModalMobileComponent,
    ViewTaskModalComponent,
    NzModalModule,
  ],
})
export class TasksPageComponent implements OnInit {
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();

  isMobile = isMobile;

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);

  ngOnInit(): void {
    if (this.isMobile) {
      this.tasksStore.loadTasksPage();
      this.taskUserConfigsStore.resetWeekOffset();
    }
  }
}
