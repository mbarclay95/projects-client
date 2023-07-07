import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createTask, Task} from '../../../models/task.model';
import {TasksStore, TaskUiState} from './tasks.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {TasksQuery} from "./tasks.query";
import {TagsService} from "../../tags.service";
import {differenceInDays, endOfWeek} from 'date-fns';
import {createTaskHistory, TaskHistory} from '../../../models/task-history.model';

@Injectable({providedIn: 'root'})
export class TasksService {
  constructor(
    private tasksStore: TasksStore,
    private http: HttpClient,
    private tasksQuery: TasksQuery,
    private tagsService: TagsService,
  ) {
  }

  async getTasks(queryString: string, showLoading = true): Promise<void> {
    if (showLoading) {
      this.tasksStore.update({loading: true});
    }
    await firstValueFrom(this.http.get<Task[]>(`${environment.apiUrl}/tasks?${queryString}`).pipe(
      map(tasks => tasks.map(task => createTask(task))),
      tap(tasks => {
        this.tasksStore.set(tasks);
        if (showLoading) {
          this.tasksStore.update({loading: false});
        }
      })
    ));
  }

  async createNewTask(task: Task): Promise<void> {
    await firstValueFrom(this.http.post<Task>(`${environment.apiUrl}/tasks`, task).pipe(
      map(task => createTask(task)),
      tap(task => this.tasksStore.add(task))
    ));
    void this.tagsService.getTags();
  }

  async updateTask(taskId: number, task: Partial<Task>, getTags = true, removeFromList = false): Promise<Task | undefined> {
    const currentTask = this.tasksQuery.getEntity(taskId);
    if (!currentTask) {
      return undefined;
    }
    const newTask = await firstValueFrom(this.http.put<Task>(`${environment.apiUrl}/tasks/${taskId}`, {...currentTask, ...task}).pipe(
      map(task => createTask(task)),
      tap(task => {
        removeFromList ?
          this.tasksStore.remove(taskId) :
          this.tasksStore.update(taskId, task);
      })
    ));
    if (getTags) {
      void this.tagsService.getTags();
    }

    return newTask;
  }

  async deleteTask(task: Task) {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/tasks/${task.id}`).pipe(
      tap(() => this.tasksStore.remove(task.id))
    ));
  }

  updateUi(newState: Partial<TaskUiState>, reloadTasks = true, showLoading = true): void {
    const newUi = {...this.tasksQuery.getUi(), ...newState};
    this.tasksStore.update({ui: newUi});
    if (reloadTasks) {
      void this.getTasks(this.tasksQuery.getQueryString(newUi), showLoading);
    }
  }

  async loadTaskHistoryIfNeeded(task: Task): Promise<void> {
    if (task.taskHistory !== undefined) {
      return;
    }
    await firstValueFrom(this.http.get<TaskHistory[]>(`${environment.apiUrl}/tasks/${task.id}/history`).pipe(
      map(histories => histories.map(history => createTaskHistory(history))),
      tap(histories => this.tasksStore.update(task.id, {taskHistory: histories}))
    ));
  }

  loadNextWeekOfTasks(): void {
    const ui = this.tasksQuery.getUi();
    this.updateUi({numOfDays: (ui.numOfDays ?? 0) + 7}, true, false);
  }

  loadWeeklyTasksPage(): void {
    this.updateUi({
      numOfDays: differenceInDays(endOfWeek(new Date(), {weekStartsOn: 1}), new Date()),
      ownerType: 'family',
      recurringType: 'both',
      completedStatus: 'notCompleted',
      search: null,
      tags: [],
      showPaused: false,
      highPriorityFirst: true
    });
  }

  loadTasksPage(): void {
    this.updateUi({
      numOfDays: null,
      ownerType: null,
      completedStatus: 'notCompleted',
      search: null,
      tags: [],
      showPaused: true,
      highPriorityFirst: false
    });
  }
}
