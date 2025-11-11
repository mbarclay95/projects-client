import { Component, inject, Input, ViewChild } from '@angular/core';
import { Task } from '../../models/task.model';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { fa1, faEdit, faPeopleRoof, faRepeat, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { TasksSignalStore, TasksUiState } from '../../services/tasks-signal-store';
import { TagsSignalStore } from '../../services/tags-signal-store';
import { NgClass, DatePipe } from '@angular/common';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NgClass,
    NzButtonComponent,
    FaIconComponent,
    NzPopconfirmDirective,
    DatePipe,
  ],
})
export class TasksTableComponent {
  @ViewChild('tasksTableTag', { static: true }) tasksTable: NzTableComponent<Task> | undefined;
  @Input() set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }
  @Input() ui!: TasksUiState;

  highlightedTaskId?: number;
  _tasks: Task[] = [];
  edit = faEdit;
  delete = faTrash;
  repeat = faRepeat;
  single = fa1;
  household = faPeopleRoof;
  personal = faUser;

  readonly familiesStore = inject(FamiliesSignalStore);
  readonly tasksStore = inject(TasksSignalStore);
  readonly nzMessageService = inject(NzMessageService);
  readonly tagsStore = inject(TagsSignalStore);

  deleteTask(task: Task): void {
    this.tasksStore.remove({
      id: task.id,
      onSuccess: () => {
        this.nzMessageService.success('Task deleted');
        this.tagsStore.loadAll();
      },
    });
  }
}
