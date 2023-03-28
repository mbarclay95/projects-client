import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createTask, Task} from '../../../models/task.model';
import {TasksStore, TaskUiState} from './tasks.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {TasksQuery} from "./tasks.query";
import {TagsService} from "../../tags.service";
import {Pagination} from "../../../../models/pagination.model";
import {setLoading} from '@datorama/akita';
import {differenceInDays, endOfWeek} from 'date-fns';

@Injectable({providedIn: 'root'})
export class TasksService {
  constructor(
    private tasksStore: TasksStore,
    private http: HttpClient,
    private tasksQuery: TasksQuery,
    private tagsService: TagsService,
  ) {
  }

  async getTasks(queryString: string): Promise<void> {
    await firstValueFrom(this.http.get<Task[] | Pagination<Task>>(`${environment.apiUrl}/tasks?${queryString}`).pipe(
      setLoading(this.tasksStore),
      map(tasks => {
        if ('total' in tasks) {
          this.tasksStore.update({ui: {...this.tasksQuery.getUi(), ...{total: tasks.total}}});
          return tasks.data.map(task => createTask(task));
        }
        return tasks.map(task => createTask(task))
      }),
      tap(tasks => this.tasksStore.set(tasks))
    ));
  }

  async createNewTask(task: Task): Promise<void> {
    await firstValueFrom(this.http.post<Task>(`${environment.apiUrl}/tasks`, task).pipe(
      map(task => createTask(task)),
      tap(task => this.tasksStore.add(task))
    ));
    void this.tagsService.getTags();
  }

  async updateTask(taskId: number, task: Partial<Task>, getTags = true, removeFromList = false): Promise<Task> {
    const newTask = {...this.tasksQuery.getEntity(taskId), ...task};
    const t = await firstValueFrom(this.http.put<Task>(`${environment.apiUrl}/tasks/${taskId}`, newTask).pipe(
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

    return t;
  }

  async deleteTask(task: Task) {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/tasks/${task.id}`).pipe(
      tap(() => this.tasksStore.remove(task.id))
    ));
  }

  updateUi(newState: Partial<TaskUiState>, reloadTasks = true): void {
    const newUi = {...this.tasksQuery.getUi(), ...newState};
    this.tasksStore.update({ui: newUi});
    if (reloadTasks) {
      void this.getTasks(this.tasksQuery.getQueryString(newUi));
    }
  }

  loadWeeklyTasksPage(): void {
    this.updateUi({
      numOfDays: differenceInDays(endOfWeek(new Date(), {weekStartsOn: 1}), new Date()),
      ownerType: 'family',
      recurringType: 'both',
      completedStatus: 'notCompleted',
      search: null,
      tags: [],
      showInactive: false,
      highPriorityFirst: true
    });
  }

  loadTasksPage(): void {
    this.updateUi({
      numOfDays: null,
      ownerType: null,
      page: 1,
      completedStatus: 'notCompleted',
      search: null,
      tags: [],
      showInactive: true,
      highPriorityFirst: false
    });
  }
}
