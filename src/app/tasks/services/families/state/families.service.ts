import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {arrayAdd, arrayRemove, arrayUpdate, ID} from '@datorama/akita';
import {map, tap} from 'rxjs/operators';
import {createFamily, Family} from '../../../models/family.model';
import {FamiliesStore} from './families.store';
import {firstValueFrom} from "rxjs";
import {environment} from "../../../../../environments/environment";
import {FamiliesQuery} from "./families.query";
import {TaskUserConfig, User} from "../../../../users/models/user.model";
import {createTaskPoint, TaskPoint} from "../../../models/task-point.model";

@Injectable({providedIn: 'root'})
export class FamiliesService {

  constructor(
    private familiesStore: FamiliesStore,
    private http: HttpClient,
    private familiesQuery: FamiliesQuery,
  ) {
  }

  async getFamilies(): Promise<void> {
    await firstValueFrom(this.http.get<Family[]>(`${environment.apiUrl}/families`).pipe(
      map(families => families.map(family => createFamily(family))),
      tap(families => this.familiesStore.set(families))
    ));
  }

  async getFamily(familyId: number): Promise<void> {
    await firstValueFrom(this.http.get<Family>(`${environment.apiUrl}/families/${familyId}`).pipe(
      map(family => createFamily(family)),
      tap(family => this.familiesStore.upsert(familyId, family))
    ));
  }

  async refreshActiveFamily(): Promise<void> {
    const activeId = this.familiesQuery.activeId;
    if (activeId) {
      await this.getFamily(activeId);
    }
  }

  setActive(familyId: number): void {
    this.familiesStore.setActive(familyId);
  }

  async createNewFamily(family: Family): Promise<void> {
    await firstValueFrom(this.http.post<Family>(`${environment.apiUrl}/families`, family).pipe(
      map(family => createFamily(family)),
      tap(family => this.familiesStore.add(family))
    ));
  }

  async updateFamily(familyId: number, family: Partial<Family>): Promise<void> {
    const newFamily = {...this.familiesQuery.getEntity(familyId), ...family};
    await firstValueFrom(this.http.put<Family>(`${environment.apiUrl}/families/${familyId}`, newFamily).pipe(
      map(family => createFamily(family)),
      tap(family => this.familiesStore.update(family.id, family))
    ));
  }

  async updateTaskUserConfig(familyId: number, user: User, taskUserConfig: TaskUserConfig): Promise<void> {
    await firstValueFrom(this.http.put<TaskUserConfig>(`${environment.apiUrl}/task-user-config/${taskUserConfig.id}`, taskUserConfig).pipe(
      map(taskUserConfig => {
        return {...user, taskUserConfig};
      }),
      tap(user => this.familiesStore.update(familyId, ({ members }) => ({
        members: arrayUpdate(members, user.id, user)
      })))
    ));
  }

  updateTaskCompletedCount(familyId: number, userId: number, newCount: number) {
    const member = this.familiesQuery.getEntity(familyId)?.members.find(u => u.id === userId);
    if (member && member.taskUserConfig) {
      const newTaskUserConfig = {...member.taskUserConfig, ...{tasksCompleted: newCount}};
      this.familiesStore.update(familyId, ({ members }) => ({
        members: arrayUpdate(members, userId, {taskUserConfig: newTaskUserConfig})
      }));
    }
  }

  async saveTaskPoint(taskPoint: TaskPoint, familyId: number): Promise<void> {
    await firstValueFrom(this.http.post(`${environment.apiUrl}/task-points`, {...taskPoint, familyId}).pipe(
      map(taskPoint => createTaskPoint(taskPoint)),
      tap(taskPoint => this.familiesStore.update(familyId, ({ taskPoints }) => ({
        taskPoints: arrayAdd(taskPoints, taskPoint)
      })))
    ));
  }

  async updateTaskPoint(taskPoint: TaskPoint, familyId: number): Promise<void> {
    await firstValueFrom(this.http.put(`${environment.apiUrl}/task-points/${taskPoint.id}`, taskPoint).pipe(
      map(taskPoint => createTaskPoint(taskPoint)),
      tap(taskPoint => this.familiesStore.update(familyId, ({ taskPoints }) => ({
        taskPoints: arrayUpdate(taskPoints, taskPoint.id, taskPoint)
      })))
    ));
  }

  async removeTaskPoint(taskPoint: TaskPoint, familyId: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/task-points/${taskPoint.id}`).pipe(
      tap(() => this.familiesStore.update(familyId, ({ taskPoints }) => ({
        taskPoints: arrayRemove(taskPoints, taskPoint.id)
      })))
    ));
  }
}
