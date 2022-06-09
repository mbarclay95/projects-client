import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor(
    public tasksQuery: TasksQuery
  ) { }

  ngOnInit(): void {
  }

}
