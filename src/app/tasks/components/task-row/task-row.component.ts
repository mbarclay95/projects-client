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
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { DueDateHumanReadablePipe } from '../../pipes/due-date-human-readable.pipe';
import { TaskPointColorPipe } from '../../pipes/task-point-color.pipe';

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss'],
  imports: [
    NzCheckboxComponent,
    ReactiveFormsModule,
    FormsModule,
    FaIconComponent,
    NzButtonComponent,
    NzDropDownDirective,
    NzDropdownMenuComponent,
    NzMenuDirective,
    NzMenuItemComponent,
    DueDateHumanReadablePipe,
    TaskPointColorPipe,
  ],
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
