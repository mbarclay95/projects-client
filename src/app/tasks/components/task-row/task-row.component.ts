import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { faArrowRightToBracket, faEdit, faEllipsisV, faFlag } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { isMobile } from '../../../app.component';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TaskUserConfigsSignalStore } from '../../services/task-user-configs-signal-store';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { TagsSignalStore } from '../../services/tags-signal-store';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  standalone: false,
})
export class TaskRowComponent {
  @Input() task!: Task;
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();

  menuVisible = false;
  isMobile = isMobile;
  flag = faFlag;
  more = faEllipsisV;
  eye = faEye;
  edit = faEdit;
  skip = faArrowRightToBracket;

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly taskUserConfigsStore = inject(TaskUserConfigsSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly nzMessageService = inject(NzMessageService);
  readonly tagsStore = inject(TagsSignalStore);

  completedTask() {
    this.tasksStore.update({
      entity: { ...this.task, ...{ completedAt: new Date() } },
      removeFromStore: true,
      onSuccess: (task) => {
        this.tagsStore.loadAll();
        this.taskUserConfigsStore.addCompletedTaskToActive(task);
        this.nzMessageService.success('Task Completed!');
      },
    });
  }
}
