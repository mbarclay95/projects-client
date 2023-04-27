import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {TasksStore, TasksState, TaskUiState} from './tasks.store';
import {combineLatest, Observable} from "rxjs";
import {Task} from "../../../models/task.model";
import {map} from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class TasksQuery extends QueryEntity<TasksState> {
  tasks$: Observable<Task[]> = this.selectAll();
  ui$: Observable<TaskUiState> = this.select().pipe(
    map(state => state.ui)
  );
  filteredTasks$: Observable<Task[]> = combineLatest([
    this.tasks$,
    this.ui$
  ]).pipe(
    map(([tasks, ui]: [Task[], TaskUiState]) => {
      let filteredTasks: Task[] = [...tasks];
      if (ui.ownerType) {
        filteredTasks = filteredTasks.filter(task => task.ownerType === ui.ownerType);
      }

      if (ui.search && ui.search !== '') {
        filteredTasks = filteredTasks
          .filter(task => task.name.toLowerCase().includes((ui.search as string).toLowerCase()) ||
            task.description?.toLowerCase().includes((ui.search as string).toLowerCase()));
      }

      if (ui.tags.length > 0) {
        filteredTasks = filteredTasks.filter(task => task.tags.filter(tag => ui.tags.includes(tag)).length > 0);
      }

      if (ui.highPriorityFirst) {
        filteredTasks = filteredTasks.sort((a, b) => {
          if (a.priority === b.priority) {
            return (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0);
          }

          return b.priority - a.priority;
        });
      } else {
        filteredTasks = filteredTasks
          .sort((a, b) => (a.dueDate?.getTime() ?? 0) - (b.dueDate?.getTime() ?? 0));
      }

      return filteredTasks;
    })
  );
  familyCount$: Observable<number> = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.ownerType === 'family').length)
  );
  userCount$: Observable<number> = this.tasks$.pipe(
    map(tasks => tasks.filter(task => task.ownerType === 'user').length)
  );
  selectedWeeklyPageIndex$: Observable<number> = this.ui$.pipe(
    map(ui => ui.ownerType === 'user' ? 1 : 0)
  );

  constructor(
    protected override store: TasksStore
  ) {
    super(store);
  }

  getUi(): TaskUiState {
    return this.getValue().ui;
  }

  getWeeklyTaskPageIndex(): number {
    return this.getUi().ownerType === 'user' ? 1 : 0;
  }

  getQueryString(ui: TaskUiState = this.getUi()) {
    let queryString = `sort=${ui.sort}&sortDir=${ui.sortDir}&completedStatus=${ui.completedStatus}&showPaused=${ui.showPaused ? 1 : 0}&`;
    if (ui.numOfDays !== null) {
      queryString += `numOfDays=${ui.numOfDays}&`;
    }

    // do all of this client side for now
    // queryString += `recurringType=${ui.recurringType}&`

    // if (ui.ownerType && ui.ownerId) {
    //   queryString += `ownerType=${ui.ownerType}&ownerId=${ui.ownerId}&`;
    // }
    // if (ui.search) {
    //   queryString += `search=${ui.search}&`;
    // }
    // if (ui.tags.length > 0) {
    //   queryString += ui.tags.reduce((prev, curr) => prev + `tags[]=${curr}&`, '');
    // }

    return queryString;
  }

}
