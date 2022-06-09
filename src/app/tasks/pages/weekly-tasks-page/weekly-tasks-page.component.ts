import { Component, OnInit } from '@angular/core';
import {FamiliesQuery} from "../../services/families/state/families.query";
import {TasksQuery} from "../../services/tasks/state/tasks.query";

@Component({
  selector: 'app-weekly-tasks-page',
  templateUrl: './weekly-tasks-page.component.html',
  styleUrls: ['./weekly-tasks-page.component.scss']
})
export class WeeklyTasksPageComponent implements OnInit {

  constructor(
    public familiesQuery: FamiliesQuery,
    public tasksQuery: TasksQuery
  ) { }

  ngOnInit(): void {
  }

}
