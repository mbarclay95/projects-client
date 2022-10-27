import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {debounceTime, distinctUntilChanged, map, tap} from 'rxjs/operators';
import {createTask, Task} from '../../../models/task.model';
import {TasksStore, TaskUiState} from './tasks.store';
import {firstValueFrom, Subject, takeUntil} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {TasksQuery} from "./tasks.query";
import {TagsService} from "../../tags.service";
import {FamiliesService} from "../../families/state/families.service";
import {Pagination} from "../../../../models/pagination.model";
import {setLoading} from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class TasksService {
  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private tasksStore: TasksStore,
    private http: HttpClient,
    private tasksQuery: TasksQuery,
    private tagsService: TagsService,
    private familiesService: FamiliesService,
  ) {
    // this.subscribeToUi();
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
    this.tagsService.getTags();
  }

  async updateTask(taskId: number, task: Partial<Task>, getTags = true, removeFromList = false) {
    const newTask = {...this.tasksQuery.getEntity(taskId), ...task};
    await firstValueFrom(this.http.put<Task>(`${environment.apiUrl}/tasks/${taskId}`, newTask).pipe(
      map(task => createTask(task)),
      tap(task => {
        if (removeFromList) {
          this.tasksStore.remove(taskId);
          this.familiesService.refreshActiveFamily();
        } else {
          this.tasksStore.update(taskId, task);
        }
      })
    ));
    if (getTags) {
      this.tagsService.getTags();
    }
  }

  async deleteTask(task: Task) {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/tasks/${task.id}`).pipe(
      tap(() => this.tasksStore.remove(task.id))
    ));
  }

  updateUi(newState: Partial<TaskUiState>): void {
    const newUi = {...this.tasksQuery.getUi(), ...newState};
    this.tasksStore.update({ui: newUi});
    this.getTasks(this.tasksQuery.getQueryString(newUi));
  }

  // subscribeToUi() {
  //   this.tasksQuery.ui$.pipe(
  //     debounceTime(500),
  //     distinctUntilChanged
  //     takeUntil(this.subscriptionDestroyer)
  //   ).subscribe(ui => {
  //     console.log(ui);
  //     this.getTasks(this.tasksQuery.getQueryString(ui))
  //   });
  // }
}
