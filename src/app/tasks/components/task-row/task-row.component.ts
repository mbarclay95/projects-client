import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/task.model";
import {faHome, faUser} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-task-row',
  templateUrl: './task-row.component.html',
  styleUrls: ['./task-row.component.scss']
})
export class TaskRowComponent implements OnInit {
  @Input() task!: Task;
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  family = faHome;
  personal = faUser

  constructor() { }

  ngOnInit(): void {
  }

  completedTask(id: any, $event: any) {

  }
}
