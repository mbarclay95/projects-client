import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../models/task.model";

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit {
  @Input() tasks!: Task[]|null;

  constructor() { }

  ngOnInit(): void {
  }

}
