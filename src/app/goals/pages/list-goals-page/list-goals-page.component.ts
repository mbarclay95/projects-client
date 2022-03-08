import { Component, OnInit } from '@angular/core';
import {GoalsQuery} from "../../services/state/goals.query";
import {createGoal, Goal} from "../../models/goal.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-list-goals-page',
  templateUrl: './list-goals-page.component.html',
  styleUrls: ['./list-goals-page.component.scss']
})
export class ListGoalsPageComponent implements OnInit {
  openGoalModal: Subject<Goal> = new Subject<Goal>();

  constructor(
    public goalsQuery: GoalsQuery
  ) { }

  ngOnInit(): void {
  }

  createNewGoal() {
    const newGoal = createGoal({equality: 'lessThan', lengthOfTime: 'day'});
    this.openGoalModal.next(newGoal);
  }

}
