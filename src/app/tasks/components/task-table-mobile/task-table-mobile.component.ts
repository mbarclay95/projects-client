import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { faEdit, faFlag, faPeopleRoof, faRepeat, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { TasksUiState } from '../../services/tasks-signal-store';

@Component({
  selector: 'app-task-table-mobile',
  templateUrl: './task-table-mobile.component.html',
  styleUrls: ['./task-table-mobile.component.scss'],
  standalone: false,
})
export class TaskTableMobileComponent {
  @Input() set tasks(tasks: Task[]) {
    this._tasks = tasks;
  }
  @Input() ui!: TasksUiState;
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();

  highlightedTaskId?: number;
  _tasks: Task[] = [];
  expandSet = new Set<number>();
  edit = faEdit;
  delete = faTrash;
  repeat = faRepeat;
  household = faPeopleRoof;
  personal = faUser;
  flag = faFlag;
}
