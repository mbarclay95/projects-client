import {Component, OnInit} from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {createTask, Task} from "../../models/task.model";
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-weekly-tasks-page',
  templateUrl: './weekly-tasks-page.component.html',
  styleUrls: ['./weekly-tasks-page.component.scss']
})
export class WeeklyTasksPageComponent implements OnInit {
  isMobile = isMobile;
  createTask: Observable<Task> = this.mobileHeaderService.clickedButton$.pipe(
    map(() => createTask({ownerId: this.familiesQuery.activeId, taskPoint: this.familiesQuery.getZeroTaskPoint()}))
  );

  constructor(
    public familiesQuery: FamiliesQuery,
    public tasksQuery: TasksQuery,
    private tasksService: TasksService,
    private mobileHeaderService: MobileHeaderService
  ) {
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.tasksService.loadWeeklyTasksPage();
    }
  }

}
