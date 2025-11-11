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
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzProgressComponent } from 'ng-zorro-antd/progress';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { FirstNamePipe } from '../../../shared/pipes/first-name.pipe';
import { WeeklyProgressPercentPipe } from '../../pipes/weekly-progress-percent.pipe';
import { TotalCompletedTasksPipe } from '../../pipes/total-completed-tasks.pipe';

@Component({
  selector: 'app-my-family-members',
  templateUrl: './my-family-members.component.html',
  styleUrls: ['./my-family-members.component.scss'],
  imports: [
    NzSpinComponent,
    FaIconComponent,
    NzPopoverDirective,
    NzInputNumberComponent,
    ReactiveFormsModule,
    FormsModule,
    NzProgressComponent,
    NzPopconfirmDirective,
    NzDividerComponent,
    FirstNamePipe,
    WeeklyProgressPercentPipe,
    TotalCompletedTasksPipe,
  ],
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
  readonly nzMessageService = inject(NzMessageService);

  saveSettings(memberConfig: TaskUserConfig, popoverOpened: boolean) {
    if (!popoverOpened) {
      const newTaskConfig = { ...memberConfig };
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
