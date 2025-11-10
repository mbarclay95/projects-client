import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksSignalStore } from '../../services/tasks-signal-store';
import { TaskRowComponent } from '../task-row/task-row.component';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  imports: [TaskRowComponent, NzEmptyComponent, NzButtonComponent],
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();

  readonly tasksStore = inject(TasksSignalStore);
}
