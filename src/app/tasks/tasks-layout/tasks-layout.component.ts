import { Component, effect, inject } from '@angular/core';
import { FamiliesSignalStore } from '../services/families-signal-store';
import { AuthSignalStore } from '../../auth/services/auth-signal-store';
import { TaskUserConfigsSignalStore } from '../services/task-user-configs-signal-store';
import { FamilyStatsSignalStore } from '../services/family-stats-signal-store';
import { TasksSignalStore } from '../services/tasks-signal-store';

@Component({
  selector: 'app-tasks-layout',
  templateUrl: './tasks-layout.component.html',
  styleUrls: ['./tasks-layout.component.scss'],
  standalone: false,
})
export class TasksLayoutComponent {
  readonly authStore = inject(AuthSignalStore);
  readonly familiesStore = inject(FamiliesSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly familyStatsStore = inject(FamilyStatsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);

  constructor() {
    effect(() => {
      this.tasksStore.setQueryString(this.tasksStore.buildQueryString());
      if (this.tasksStore.shouldHttpReload()) {
        this.tasksStore.loadAll({});
      }
    });
    const familyId = this.authStore.auth()?.familyId;
    if (familyId) {
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
    if (this.authStore.viewFamiliesTab()) {
      this.familiesStore.loadAll({});
    } else if (familyId) {
      this.familiesStore.loadOne({ entityId: familyId });
    }
    if (familyId) {
      this.familiesStore.setActiveFamily(familyId);
    }
  }
}
