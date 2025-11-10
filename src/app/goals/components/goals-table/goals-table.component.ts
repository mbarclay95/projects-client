import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { Goal } from '../../models/goal.model';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-goals-table',
  templateUrl: './goals-table.component.html',
  styleUrls: ['./goals-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzButtonComponent,
    FaIconComponent,
    NzPopconfirmDirective,
    DatePipe,
  ],
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
