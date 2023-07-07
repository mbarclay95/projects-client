import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {TasksService} from '../../services/tasks/state/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasks: Task[] = [];
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() viewTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() skipTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(
    public tasksService: TasksService
  ) { }

  ngOnInit(): void {
  }

}
