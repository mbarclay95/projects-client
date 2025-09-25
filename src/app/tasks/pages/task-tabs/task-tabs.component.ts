import { Component, inject, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Task } from '../../models/task.model';
import { AuthSignalStore } from '../../../auth/services/auth-signal-store';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';

@Component({
  selector: 'app-task-tabs',
  templateUrl: './task-tabs.component.html',
  styleUrls: ['./task-tabs.component.scss'],
  standalone: false,
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
