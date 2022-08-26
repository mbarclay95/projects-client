import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {createTask, Task} from "../../models/task.model";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  isMobile = screen.width < 600;
  createEditTask: Observable<Task> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(() => createTask({}))
    ),
    this.editTask.asObservable()
  );

  constructor(
    public tasksQuery: TasksQuery,
    public tasksService: TasksService,
    private mobileHeaderService: MobileHeaderService
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
