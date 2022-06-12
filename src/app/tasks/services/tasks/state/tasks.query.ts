import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import {TasksStore, TasksState, TaskUiState} from './tasks.store';
import {Observable} from "rxjs";
import {Task} from "../../../models/task.model";
import {map} from "rxjs/operators";

@Injectable({ providedIn: 'root' })
export class TasksQuery extends QueryEntity<TasksState> {
  tasks$: Observable<Task[]> = this.selectAll();
  ui$: Observable<TaskUiState> = this.select().pipe(
    map(state => state.ui)
  );

  constructor(
    protected override store: TasksStore
  ) {
    super(store);
  }

  getUi(): TaskUiState {
    return this.getValue().ui;
  }

  getQueryString(ui: TaskUiState = this.getUi()) {
    let queryString = `sort=${ui.sort}&sortDir=${ui.sortDir}&recurringType=${ui.recurringType}&completedStatus=${ui.completedStatus}&`;
    if (ui.numOfDays) {
      queryString += `numOfDays=${ui.numOfDays}&`;
    } else {
      queryString += `page=${ui.page}&pageSize=${ui.pageSize}&`;
    }
    if (ui.ownerType && ui.ownerId) {
      queryString += `ownerType=${ui.ownerType}&ownerId=${ui.ownerId}&`;
    }

    return queryString;
  }

}
