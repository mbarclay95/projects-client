import { Component, OnInit } from '@angular/core';
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {FamiliesQuery} from "../../services/families/state/families.query";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(
    public familiesQuery: FamiliesQuery,
    public tasksQuery: TasksQuery
  ) { }

  ngOnInit(): void {
  }

}
