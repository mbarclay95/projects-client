import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals-table-mobile',
  templateUrl: './goals-table-mobile.component.html',
  styleUrls: ['./goals-table-mobile.component.scss'],
  standalone: false,
})
export class GoalsTableMobileComponent {
  @Input() set goals(goals: Goal[] | null) {
    if (goals) {
      this._goals = goals;
    }
  }
  @Output() editGoal: EventEmitter<number> = new EventEmitter<number>();

  _goals: Goal[] = [];
  edit = faEdit;
}
