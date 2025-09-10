import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { TasksSignalStore } from '../../services/tasks-signal-store';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss'],
  standalone: false,
})
export class TasksListComponent {
  @Input() tasks: Task[] = [];
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();

  readonly tasksStore = inject(TasksSignalStore);
}
