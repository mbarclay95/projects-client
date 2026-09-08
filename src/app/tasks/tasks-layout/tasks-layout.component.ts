import { Component, effect, inject } from '@angular/core';
import { UserGroupsSignalStore } from '../../shared/services/user-groups-signal-store';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { TaskUserConfigsSignalStore } from '../services/task-user-configs-signal-store';
import { FamilyStatsSignalStore } from '../services/family-stats-signal-store';
import { TasksSignalStore } from '../services/tasks-signal-store';
import { TagsSignalStore } from '../../shared/services/tags-signal-store';
import { NzContentComponent } from 'ng-zorro-antd/layout';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tasks-layout',
  templateUrl: './tasks-layout.component.html',
  styleUrls: ['./tasks-layout.component.scss'],
  imports: [NzContentComponent, RouterOutlet],
})
export class TasksLayoutComponent {
  readonly authStore = inject(AuthSignalStore);
  readonly familiesStore = inject(UserGroupsSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly familyStatsStore = inject(FamilyStatsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly tagsStore = inject(TagsSignalStore);

  constructor() {
    this.tagsStore.loadAll('tasks');
    effect(() => {
      this.tasksStore.setQueryString(this.tasksStore.buildQueryString());
      if (this.tasksStore.shouldHttpReload()) {
        this.tasksStore.loadAll({});
      }
    });
    const taskGroupId = this.authStore.auth()?.taskGroupId;
    if (taskGroupId) {
      effect(() => {
        const queryString = this.taskUserConfigsStore.buildQueryString();
        if (queryString) {
          this.taskUserConfigsStore.setQueryString(queryString);
          this.taskUserConfigsStore.loadAll({});
        }
      });
      effect(() => {
        this.familyStatsStore.setQueryString(this.familyStatsStore.buildQueryString());
        this.familyStatsStore.loadAll({});
      });
    }
    if (taskGroupId) {
      this.familiesStore.loadOne({ entityId: taskGroupId });
      this.familiesStore.setActiveGroup(taskGroupId);
    }
  }
}
