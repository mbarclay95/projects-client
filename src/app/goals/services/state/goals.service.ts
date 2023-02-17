import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GoalsStore, GoalsUiState} from './goals.store';
import {firstValueFrom, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {createGoal, createGoalDay, Goal, GoalDay} from "../../models/goal.model";
import {GoalsQuery} from './goals.query';
import {arrayAdd, arrayRemove, arrayUpdate} from '@datorama/akita';

@Injectable({providedIn: 'root'})
export class GoalsService {

  constructor(
    private goalsStore: GoalsStore,
    private goalsQuery: GoalsQuery,
    private http: HttpClient
  ) {
  }

  async getAllGoals(): Promise<void> {
    const queryString = this.goalsQuery.buildQueryString();
    await firstValueFrom(this.http.get<Goal[]>(`${environment.apiUrl}/goals?${queryString}`).pipe(
      map((goals) => goals.map((goal) => createGoal(goal))),
      tap((goals) => this.goalsStore.set(goals))
    ));
  }

  async createNewGoal(goal: Goal): Promise<void> {
    await firstValueFrom(this.http.post<Goal>(`${environment.apiUrl}/goals`, goal).pipe(
      map((goal) => createGoal(goal)),
      tap((goal) => this.goalsStore.add(goal))
    ));
  }

  async createNewGoalDay(goalId: number, goalDay: GoalDay): Promise<void> {
    await firstValueFrom(this.http.post<GoalDay>(`${environment.apiUrl}/goal-days`, {...goalDay, ...{goalId}}).pipe(
      map(goalDay => createGoalDay(goalDay)),
      tap(goalDay => this.goalsStore.update(goalId, ({goalDays}) => ({
        goalDays: arrayAdd(goalDays, goalDay)
      })))
    ))
  }

  async updateGoalDay(goalId: number, goalDay: GoalDay): Promise<void> {
    await firstValueFrom(this.http.patch<GoalDay>(`${environment.apiUrl}/goal-days/${goalDay.id}`, goalDay).pipe(
      map(goalDay => createGoalDay(goalDay)),
      tap(goalDay => this.goalsStore.update(goalId, ({goalDays}) => ({
        goalDays: arrayUpdate(goalDays, goalDay.id, goalDay)
      })))
    ))
  }

  async deleteGoalDay(goalId: number, goalDay: GoalDay): Promise<void> {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/goal-days/${goalDay.id}`).pipe(
      tap(() => this.goalsStore.update(goalId, ({goalDays}) => ({
        goalDays: arrayRemove(goalDays, goalDay.id)
      })))
    ))
  }

  updateUi(newState: Partial<GoalsUiState>): void {
    const newUi = {...this.goalsQuery.getUi(), ...newState};
    this.goalsStore.update({ui: newUi});
  }

}
