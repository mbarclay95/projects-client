import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Goal } from '../../models/goal.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals-table',
  templateUrl: './goals-table.component.html',
  styleUrls: ['./goals-table.component.scss'],
})
export class GoalsTableComponent implements OnInit {
  @ViewChild('goalsTableTag', { static: true }) goalsTable: NzTableComponent<Goal> | undefined;
  @Input() set goals(goals: Goal[] | null) {
    if (goals) {
      this._goals = goals;
    }
  }
  @Output() editGoal: EventEmitter<Goal> = new EventEmitter<Goal>();

  _goals: Goal[] = [];
  edit = faEdit;
  delete = faTrash;

  constructor() {}

  ngOnInit(): void {}

  deleteGoal(goal: Goal) {}
}
