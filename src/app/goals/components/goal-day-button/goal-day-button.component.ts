import { Component, Input, OnInit } from '@angular/core';
import { Goal } from '../../models/goal.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { GoalDay } from '../../models/goal-day.model';
import { NzPopoverDirective } from 'ng-zorro-antd/popover';
import { NzSpaceComponent } from 'ng-zorro-antd/space';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { PluralizeGoalPipe } from '../../pipes/pluralize-goal.pipe';

@Component({
  selector: 'app-goal-day-button',
  templateUrl: './goal-day-button.component.html',
  styleUrls: ['./goal-day-button.component.scss'],
  imports: [NzPopoverDirective, NzSpaceComponent, FaIconComponent, PluralizeGoalPipe],
})
export class GoalDayButtonComponent implements OnInit {
  @Input() goal!: Goal;
  @Input() day!: string;

  @Input() set goalDay(goalDay: GoalDay) {
    this._goalDay = goalDay;
    this.initialAmount = goalDay.amount;
  }

  @Input() showBottomLeft: boolean = false;
  @Input() showBottomRight: boolean = false;

  _goalDay: GoalDay | null = null;
  initialAmount: number | null = null;
  clear = faX;

  constructor(private nzMessageService: NzMessageService) {}

  ngOnInit(): void {}

  async visibilityChange(isVisible: boolean) {
    if (!this._goalDay || isVisible || this._goalDay.amount === this.initialAmount) {
      return;
    }
    let showSuccess = true;
    try {
      // @ts-ignore
      if (this._goalDay.amount === null || this._goalDay.amount === '') {
        if (this._goalDay.id === 0) {
          showSuccess = false;
        } else {
          // await this.goalsService.deleteGoalDay(this.goal.id, this._goalDay, this.initialAmount ?? 0);
        }
      } else {
        // if (this._goalDay.id === 0) {
        //   await this.goalsService.createNewGoalDay(this.goal.id, this._goalDay);
        // } else {
        //   await this.goalsService.updateGoalDay(this.goal.id, this._goalDay, this._goalDay.amount - (this.initialAmount ?? 0));
        // }
      }
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }

    if (showSuccess) {
      this.nzMessageService.success('Goal updated', {
        nzDuration: 1000,
      });
    }
  }
}
