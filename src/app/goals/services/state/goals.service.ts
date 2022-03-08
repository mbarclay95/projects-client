import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GoalsStore } from './goals.store';
import {firstValueFrom, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {map} from "rxjs/operators";
import {createGoal, Goal} from "../../models/goal.model";

@Injectable({ providedIn: 'root' })
export class GoalsService {

  constructor(
    private goalsStore: GoalsStore,
    private http: HttpClient
  ) {
  }

  async getAllGoals(): Promise<void> {
    await firstValueFrom(this.http.get<Goal[]>(`${environment.apiUrl}/goals`).pipe(
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

}
