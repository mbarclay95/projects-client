import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Task} from "../../models/task.model";
import {NzTableComponent} from "ng-zorro-antd/table";
import {Family} from "../../models/family.model";
import {faEdit} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  @ViewChild('tasksTableTag', {static: true}) tasksTable: NzTableComponent<Task> | undefined;
  @Input() set tasks(tasks: Task[]) {
      this._tasks = tasks;
  }
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  _tasks: Task[] = [];
  edit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

}
