import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TasksQuery} from "../../services/tasks/state/tasks.query";
import {createTask, Task} from "../../models/task.model";
import {TasksService} from "../../services/tasks/state/tasks.service";
import {merge, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {MobileHeaderService} from "../../../shared/services/mobile-header.service";
import {FamiliesQuery} from '../../services/families/state/families.query';
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnInit {
  @Output() editTask: EventEmitter<Task> = new EventEmitter<Task>();

  isMobile = isMobile;
  createEditTask: Observable<Task> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(() => createTask({ownerId: this.familiesQuery.activeId, taskPoint: this.familiesQuery.getZeroTaskPoint()}))
    ),
    this.editTask.asObservable()
  );

  constructor(
    public tasksQuery: TasksQuery,
    public tasksService: TasksService,
    private mobileHeaderService: MobileHeaderService,
    private familiesQuery: FamiliesQuery
  ) {
  }

  ngOnInit(): void {
    if (this.isMobile) {
      this.tasksService.loadTasksPage();
    }
  }

}
