import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Goal } from '../../models/goal.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals-table',
  templateUrl: './goals-table.component.html',
  styleUrls: ['./goals-table.component.scss'],
  standalone: false,
})
export class GoalsTableComponent {
  @ViewChild('goalsTableTag', { static: true }) goalsTable: NzTableComponent<Goal> | undefined;
  @Input() set goals(goals: Goal[] | null) {
    if (goals) {
      this._goals = goals;
    }
  }
  @Output() editGoal: EventEmitter<number> = new EventEmitter<number>();

  _goals: Goal[] = [];
  edit = faEdit;
  delete = faTrash;

  deleteGoal(goal: Goal) {}
}
