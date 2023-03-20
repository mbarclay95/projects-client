import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {TasksStore, TasksState, TaskUiState} from './tasks.store';
import {Observable} from "rxjs";
import {Task} from "../../../models/task.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TasksQuery extends QueryEntity<TasksState> {
  tasks$: Observable<Task[]> = this.selectAll();
  dateSortedTasks$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.sort((a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0)))
  );
  sortedTasks$: Observable<Task[]> = this.tasks$.pipe(
    map(tasks => tasks.sort((a, b) => {
      if (a.priority === b.priority) {
        return (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0);
      }

      return b.priority - a.priority;
    }))
  );
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
    let queryString = `sort=${ui.sort}&sortDir=${ui.sortDir}&recurringType=${ui.recurringType}&completedStatus=${ui.completedStatus}&showInactive=${ui.showInactive ? 1 : 0}&`;
    if (ui.numOfDays !== null) {
      queryString += `numOfDays=${ui.numOfDays}&`;
    } else {
      queryString += `page=${ui.page}&pageSize=${ui.pageSize}&`;
    }
    if (ui.ownerType && ui.ownerId) {
      queryString += `ownerType=${ui.ownerType}&ownerId=${ui.ownerId}&`;
    }
    if (ui.search) {
      queryString += `search=${ui.search}&`;
    }
    if (ui.tags.length > 0) {
      queryString += ui.tags.reduce((prev, curr) => prev + `tags[]=${curr}&`, '');
    }

    return queryString;
  }

}
