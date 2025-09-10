import { Component, inject, Input } from '@angular/core';
import { TaskStrategy } from '../../models/family.model';
import { faArrowRotateLeft, faCog, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Task } from '../../models/task.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isMobile } from '../../../app.component';
import { TaskUserConfig } from '../../models/task-user-config.model';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';

@Component({
  selector: 'app-my-family-members',
  templateUrl: './my-family-members.component.html',
  styleUrls: ['./my-family-members.component.scss'],
  standalone: false,
})
export class MyFamilyMembersComponent {
  @Input() familyTaskStrategy!: TaskStrategy;
  @Input() membersConfig: TaskUserConfig[] = [];
  @Input() weekOffset!: number | null;
  @Input() loading = false;

  newTasksPerWeek?: number;
  newDefaultTasksPerWeek?: number;
  isMobile = isMobile;
  settings = faCog;
  undo = faArrowRotateLeft;
  spinner = faSpinner;
  loadingUndoId: number | null = null;

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);

  constructor(private nzMessageService: NzMessageService) {}

  saveSettings(memberConfig: TaskUserConfig, popoverOpened: boolean) {
    if (!popoverOpened) {
      let newTaskConfig = { ...memberConfig };
      if (this.newTasksPerWeek !== undefined) {
        newTaskConfig.tasksPerWeek = this.newTasksPerWeek;
        this.newTasksPerWeek = undefined;
      }
      if (this.newDefaultTasksPerWeek !== undefined) {
        newTaskConfig.defaultTasksPerWeek = this.newDefaultTasksPerWeek;
        this.newDefaultTasksPerWeek = undefined;
      }
      if (
        memberConfig.tasksPerWeek !== newTaskConfig.tasksPerWeek ||
        memberConfig.defaultTasksPerWeek !== newTaskConfig.defaultTasksPerWeek
      ) {
        this.taskUserConfigsStore.update({ entity: newTaskConfig });
      }
    }
  }

  tasksPerWeekChanged(newTasksPerWeek: number) {
    this.newTasksPerWeek = newTasksPerWeek;
  }

  defaultTasksPerWeekChanged(newDefaultTasksPerWeek: number) {
    this.newDefaultTasksPerWeek = newDefaultTasksPerWeek;
  }

  async undoTask(memberConfigId: number, task: Task) {
    this.loadingUndoId = task.id;
    this.tasksStore.update({
      entity: { ...task, ...{ completedAt: undefined } },
      onSuccess: () => {
        this.loadingUndoId = null;
        this.nzMessageService.success('Chore has been removed!');
      },
    });
    this.taskUserConfigsStore.removeTaskFromConfig(memberConfigId, task.id);
  }
}
