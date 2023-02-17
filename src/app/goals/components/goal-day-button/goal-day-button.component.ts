import {Component, Input, OnInit} from '@angular/core';
import {Goal, GoalDay} from '../../models/goal.model';
import {GoalsQuery} from '../../services/state/goals.query';
import {GoalsService} from '../../services/state/goals.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {faX} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goal-day-button',
  templateUrl: './goal-day-button.component.html',
  styleUrls: ['./goal-day-button.component.scss']
})
export class GoalDayButtonComponent implements OnInit {
  @Input() goal!: Goal;
  @Input() day!: string;

  @Input() set goalDay(goalDay: GoalDay) {
    this._goalDay = goalDay;
  }

  @Input() isFirst: boolean = false;
  @Input() isLast: boolean = false;

  _goalDay: GoalDay | null = null;
  clear = faX;

  constructor(
    private goalsQuery: GoalsQuery,
    private goalsService: GoalsService,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  async visibilityChange(isVisible: boolean) {
    if (!this._goalDay || isVisible) {
      return;
    }
    let showSuccess = true;
    try {
      // @ts-ignore
      if ((!this._goalDay.amount || this._goalDay.amount === '')) {
        if (this._goalDay.id === 0) {
          showSuccess = false;
        } else {
          await this.goalsService.deleteGoalDay(this.goal.id, this._goalDay);
        }
      } else {
        if (this._goalDay.id === 0) {
          await this.goalsService.createNewGoalDay(this.goal.id, this._goalDay);
        } else {
          await this.goalsService.updateGoalDay(this.goal.id, this._goalDay);
        }
      }
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }

    if (showSuccess) {
      this.nzMessageService.success('Goal updated');
    }
  }
}
