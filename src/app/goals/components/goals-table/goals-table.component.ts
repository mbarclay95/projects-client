import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {Goal} from "../../models/goal.model";

@Component({
  selector: 'app-goals-table',
  templateUrl: './goals-table.component.html',
  styleUrls: ['./goals-table.component.scss']
})
export class GoalsTableComponent implements OnInit {
  @ViewChild('goalsTableTag', {static: true}) usersTable: NzTableComponent<Goal> | undefined;
  @Input() set goals(goals: Goal[] | null) {
    if (goals) {
      this._goals = goals;
    }
  }

  _goals: Goal[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
