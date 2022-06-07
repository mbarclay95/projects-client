import { Component, OnInit } from '@angular/core';
import {AuthQuery} from "../../../auth/services/state/auth.query";
import {TasksQuery} from "../../services/tasks/state/tasks.query";

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {

  constructor(
    public authQuery: AuthQuery,
    public tasksQuery: TasksQuery
  ) { }

  ngOnInit(): void {
  }

}
