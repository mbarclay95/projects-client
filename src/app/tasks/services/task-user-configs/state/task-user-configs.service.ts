import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {createTaskUserConfig, TaskUserConfig} from '../../../models/task-user-config.model';
import {TaskUserConfigsStore, TaskUserConfigUiState} from './task-user-configs.store';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {AuthQuery} from '../../../../auth/services/state/auth.query';
import {TaskUserConfigsQuery} from './task-user-configs.query';
import {Task} from '../../../models/task.model';
import {arrayRemove, setLoading} from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class TaskUserConfigsService {

  constructor(
    private taskUserConfigsStore: TaskUserConfigsStore,
    private taskUserConfigsQuery: TaskUserConfigsQuery,
    private http: HttpClient,
    private authQuery: AuthQuery
  ) {
  }

  async get(familyId: number | undefined = undefined, setActive = true): Promise<void> {
    const queryString = this.taskUserConfigsQuery.buildQueryString(familyId);
    await firstValueFrom(this.http.get<TaskUserConfig[]>(`${environment.apiUrl}/task-user-config?${queryString}`).pipe(
      setLoading(this.taskUserConfigsStore),
      map(configs => configs.map(config => createTaskUserConfig(config))),
      tap(configs => {
        this.taskUserConfigsStore.set(configs);
        if (setActive) {
          const myId = this.authQuery.getValue().id;
          const myConfig = configs.find(config => config.userId === myId);
          if (myConfig) {
            this.taskUserConfigsStore.setActive(myConfig.id);
          }
        }
      })
    ));
  }

  async updateTaskUserConfig(taskUserConfig: TaskUserConfig): Promise<void> {
    await firstValueFrom(this.http.put<TaskUserConfig>(`${environment.apiUrl}/task-user-config/${taskUserConfig.id}`, taskUserConfig).pipe(
      map(taskUserConfig => createTaskUserConfig(taskUserConfig)),
      tap(taskUserConfig => this.taskUserConfigsStore.update(taskUserConfig.id, taskUserConfig))
    ));
  }

  addCompletedTaskToActive(task: Task) {
    const activeConfig = this.taskUserConfigsQuery.getActive();
    if (activeConfig) {
      this.taskUserConfigsStore.update(activeConfig.id, config => {
        return {
          completedFamilyTasks: [
            ...config.completedFamilyTasks,
            ...[task]
          ]
        };
      });
    }
  }

  removeTaskFromConfig(configId: number, taskId: number): void {
    this.taskUserConfigsStore.update(configId, ({completedFamilyTasks}) => ({
      completedFamilyTasks: arrayRemove(completedFamilyTasks, taskId)
    }));
  }

  updateUi(newState: Partial<TaskUserConfigUiState>): void {
    const newUi = {...this.taskUserConfigsQuery.getUi(), ...newState};
    this.taskUserConfigsStore.update({ui: newUi});
    void this.get();
  }

  updateWeekOffset(by: number): void {
    const currentOffset = this.taskUserConfigsQuery.getUi().weekOffset ?? 0;
    this.updateUi({weekOffset: currentOffset + by});
  }

  resetWeekOffset(): void {
    const ui = this.taskUserConfigsQuery.getUi();
    if (ui.weekOffset !== 0) {
      this.updateUi({weekOffset: 0});
    }
  }
}
