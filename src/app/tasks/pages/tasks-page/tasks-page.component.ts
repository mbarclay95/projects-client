import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {Task} from "../../models/task.model";
import {TasksService} from "../../services/tasks/state/tasks.service";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  isMobile = screen.width < 600;

  constructor(
    public tasksQuery: TasksQuery,
    public tasksService: TasksService,
  ) { }

  ngOnInit(): void {
    if (this.isMobile) {
      this.tasksService.updateUi({
        numOfDays: null,
        page: 1,
        completedStatus: 'notCompleted',
        search: null,
        tags: []
      });
    }
  }

}
