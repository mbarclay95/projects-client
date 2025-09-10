import { Component, OnInit } from '@angular/core';
import { GoalsQuery } from '../../services/state/goals.query';
import { createGoal, Goal } from '../../models/goal.model';
import { merge, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MobileDisplayService } from '../../../shared/services/mobile-display.service';
import { GoalsService } from '../../services/state/goals.service';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-list-goals-page',
  templateUrl: './list-goals-page.component.html',
  styleUrls: ['./list-goals-page.component.scss'],
  standalone: false,
})
export class ListGoalsPageComponent implements OnInit {
  isMobile = isMobile;
  openGoalModal: Subject<Goal> = new Subject<Goal>();

  openGoalModal$: Observable<Goal> = merge(
    this.mobileHeaderService.clickedButton$.pipe(map(() => createGoal({ equality: 'atLeast', lengthOfTime: 'week' }))),
    this.openGoalModal.asObservable(),
  );

  constructor(
    public goalsQuery: GoalsQuery,
    private goalsService: GoalsService,
    private mobileHeaderService: MobileDisplayService,
  ) {}

  ngOnInit(): void {
    this.goalsService.updateUi({
      weekOffset: 0,
    });
  }

  createNewGoal() {
    const newGoal = createGoal({ equality: 'atLeast', lengthOfTime: 'week' });
    this.openGoalModal.next(newGoal);
  }
}
