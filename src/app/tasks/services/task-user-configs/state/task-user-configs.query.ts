import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { TaskUserConfigsStore, TaskUserConfigsState, TaskUserConfigUiState } from './task-user-configs.store';
import { combineLatest, Observable } from 'rxjs';
import { TaskUserConfig } from '../../../models/task-user-config.model';
import { add, endOfWeek, lightFormat, startOfWeek } from 'date-fns';
import { map } from 'rxjs/operators';
import { FamiliesQuery } from '../../families/state/families.query';

@Injectable({ providedIn: 'root' })
export class TaskUserConfigsQuery extends QueryEntity<TaskUserConfigsState> {
  userConfigs$: Observable<TaskUserConfig[]> = this.selectAll();
  activeUserConfig$: Observable<TaskUserConfig | undefined> = this.selectActive();
  weekOffset$: Observable<number> = this.select('ui').pipe(map((ui) => ui.weekOffset));
  weekString$: Observable<string> = this.weekOffset$.pipe(
    map((weekOffset) => {
      let date = add(new Date(), {
        weeks: weekOffset,
      });
      const startDate = lightFormat(startOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');
      const endDate = lightFormat(endOfWeek(date, { weekStartsOn: 1 }), 'MM/dd/yy');

      return `${startDate} - ${endDate}`;
    }),
  );

  weekForwardDisabled$: Observable<boolean> = this.select('ui').pipe(map((ui) => ui.weekOffset === 1));

  weekBehindDisabled$: Observable<boolean> = combineLatest([this.select('ui'), this.familiesQuery.selectActive()]).pipe(
    map(([ui, family]) => ui.weekOffset === family?.minWeekOffset),
  );

  constructor(
    protected override store: TaskUserConfigsStore,
    private familiesQuery: FamiliesQuery,
  ) {
    super(store);
  }

  getUi(): TaskUserConfigUiState {
    return this.getValue().ui;
  }

  buildQueryString(familyId?: number): string {
    const ui = this.getUi();

    return `familyId=${familyId ?? this.familiesQuery.getActiveId()}&weekOffset=${ui.weekOffset}`;
  }
}
