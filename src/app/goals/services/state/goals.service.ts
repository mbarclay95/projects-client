import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GoalsStore, GoalsUiState} from './goals.store';
import {firstValueFrom, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {createGoal, Goal} from "../../models/goal.model";
import {GoalsQuery} from './goals.query';
import {arrayAdd, arrayRemove, arrayUpdate, setLoading} from '@datorama/akita';
import {createGoalDay, GoalDay} from '../../models/goal-day.model';

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
      setLoading(this.goalsStore),
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

  async updateGoal(goal: Goal): Promise<void> {
    const queryString = this.goalsQuery.buildQueryString(true);
    await firstValueFrom(this.http.patch<Goal>(`${environment.apiUrl}/goals/${goal.id}?${queryString}`, goal).pipe(
      map((goal) => createGoal(goal)),
      tap((newGoal) => this.goalsStore.update(goal.id, newGoal))
    ));
  }

  async createNewGoalDay(goalId: number, goalDay: GoalDay): Promise<void> {
    await firstValueFrom(this.http.post<GoalDay>(`${environment.apiUrl}/goal-days`, {...goalDay, ...{goalId}}).pipe(
      map(goalDay => createGoalDay(goalDay)),
      tap(goalDay => this.goalsStore.update(goalId, ({goalDays, currentAmount}) => ({
        goalDays: arrayAdd(goalDays, goalDay),
        currentAmount: currentAmount + (goalDay.amount ?? 0)
      })))
    ))
  }

  async updateGoalDay(goalId: number, goalDay: GoalDay, amountDiff: number): Promise<void> {
    await firstValueFrom(this.http.patch<GoalDay>(`${environment.apiUrl}/goal-days/${goalDay.id}`, goalDay).pipe(
      map(goalDay => createGoalDay(goalDay)),
      tap(goalDay => this.goalsStore.update(goalId, ({goalDays, currentAmount}) => ({
        goalDays: arrayUpdate(goalDays, goalDay.id, goalDay),
        currentAmount: currentAmount + amountDiff
      })))
    ))
  }

  async deleteGoalDay(goalId: number, goalDay: GoalDay, initialAmount: number): Promise<void> {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/goal-days/${goalDay.id}`).pipe(
      tap(() => this.goalsStore.update(goalId, ({goalDays, currentAmount}) => ({
        goalDays: arrayRemove(goalDays, goalDay.id),
        currentAmount: currentAmount - initialAmount
      })))
    ));
  }

  updateUi(newState: Partial<GoalsUiState>): void {
    const newUi = {...this.goalsQuery.getUi(), ...newState};
    this.goalsStore.update({ui: newUi});
    void this.getAllGoals();
  }

  updateWeekOffset(by: number): void {
    const currentOffset = this.goalsQuery.getUi().weekOffset ?? 0;
    this.updateUi({weekOffset: currentOffset + by});
  }

  async deleteGoal(goal: Goal): Promise<void> {
    await firstValueFrom(this.http.delete(`${environment.apiUrl}/goals/${goal.id}`).pipe(
      tap(() => this.goalsStore.remove(goal.id))
    ));
  }
}
