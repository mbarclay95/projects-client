import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {GoalsStore, GoalsState, GoalsUiState} from './goals.store';
import {combineLatest, Observable, tap} from "rxjs";
import {createGoalDay, daysOfWeek, Goal, GoalDay} from "../../models/goal.model";
import {add, isSameDay, startOfWeek} from 'date-fns';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class GoalsQuery extends QueryEntity<GoalsState> {
  goals$: Observable<Goal[]> = this.selectAll();


  constructor(
    protected override store: GoalsStore
  ) {
    super(store);
  }

  getUi(): GoalsUiState {
    return this.getValue().ui;
  }

  buildQueryString(): string {
    const ui = this.getUi();
    let queryString = '';
    if (ui.weekOffset !== null) {
      queryString += `weekOffset=${ui.weekOffset}`;
    }

    return queryString;
  }


  getGoalDays(goalId: number): Observable<{ goalDay: GoalDay, dayString: string }[]> {
    return combineLatest([
      this.selectEntity(goalId).pipe(tap(e => console.log(e))),
      this.select('ui').pipe(tap(e => console.log(e)))
    ]).pipe(
      map(([goal, ui]) => {
        if (ui.weekOffset === null || !goal) {
          return [];
        }
        let goalDays: { goalDay: GoalDay, dayString: string }[] = [];
        let date = new Date();
        date = add(date, {
          weeks: ui.weekOffset
        });
        date = startOfWeek(date, {weekStartsOn: 1});
        for (let i = 0; i < daysOfWeek.length; i++) {
          const goalDay = goal.goalDays.find(g => isSameDay(g.date, date));
          goalDays.push({
            goalDay: goalDay ? {...goalDay} : createGoalDay({id: 0, date}),
            dayString: daysOfWeek[i]
          });
          date = add(date, {
            days: 1
          });
        }

        return goalDays;
      })
    );
  }

}
