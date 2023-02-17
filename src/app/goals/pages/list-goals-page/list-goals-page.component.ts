import { Component, OnInit } from '@angular/core';
import {GoalsQuery} from "../../services/state/goals.query";
import {createGoal, Goal} from "../../models/goal.model";
import {merge, Observable, Subject} from "rxjs";
import {map} from 'rxjs/operators';
import {MobileHeaderService} from '../../../shared/services/mobile-header.service';
import {GoalsService} from '../../services/state/goals.service';

@Component({
  selector: 'app-list-goals-page',
  templateUrl: './list-goals-page.component.html',
  styleUrls: ['./list-goals-page.component.scss']
})
export class ListGoalsPageComponent implements OnInit {
  isMobile = screen.width < 600;
  openGoalModal: Subject<Goal> = new Subject<Goal>();

  openGoalModal$: Observable<Goal> = merge(
    this.mobileHeaderService.clickedButton$.pipe(
      map(() => createGoal({equality: 'lessThan', lengthOfTime: 'day'}))
    ),
    this.openGoalModal.asObservable()
  );

  constructor(
    public goalsQuery: GoalsQuery,
    private goalsService: GoalsService,
    private mobileHeaderService: MobileHeaderService
  ) { }

  ngOnInit(): void {
    this.goalsService.updateUi({
      weekOffset: 0
    });
  }

  createNewGoal() {
    const newGoal = createGoal({equality: 'lessThan', lengthOfTime: 'day'});
    this.openGoalModal.next(newGoal);
  }

}
