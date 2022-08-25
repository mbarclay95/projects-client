import { Component, OnInit } from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {createTask, Task} from "../../models/task.model";

@Component({
  selector: 'app-weekly-tasks-page',
  templateUrl: './weekly-tasks-page.component.html',
  styleUrls: ['./weekly-tasks-page.component.scss']
})
export class WeeklyTasksPageComponent implements OnInit {
  isMobile = screen.width < 600;
  createTask: Observable<Task> = this.mobileHeaderService.clickedButton$.pipe(
    map(() => createTask({}))
  );

  constructor(
    public familiesQuery: FamiliesQuery,
    public tasksQuery: TasksQuery,
    private tasksService: TasksService,
    private mobileHeaderService: MobileHeaderService
  ) { }

  ngOnInit(): void {
    if (this.isMobile) {
      this.mobileHeaderService.showCreateButton();
      this.tasksService.updateUi({
        numOfDays: 7,
        ownerId: null,
        ownerType: null,
        recurringType: 'both',
        completedStatus: 'notCompleted',
        search: null,
        tags: []
      });
    }
  }

}
