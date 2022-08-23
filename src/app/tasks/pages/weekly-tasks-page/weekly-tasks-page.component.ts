import { Component, OnInit } from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {TasksService} from "../../services/tasks/state/tasks.service";

@Component({
  selector: 'app-weekly-tasks-page',
  templateUrl: './weekly-tasks-page.component.html',
  styleUrls: ['./weekly-tasks-page.component.scss']
})
export class WeeklyTasksPageComponent implements OnInit {

  constructor(
    public familiesQuery: FamiliesQuery,
    public tasksQuery: TasksQuery,
    private tasksService: TasksService
  ) { }

  ngOnInit(): void {
    if (screen.width < 600) {
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
