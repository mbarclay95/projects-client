import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { createGoal, EqualityDropDown, Goal, LengthOfTimeDropDown } from '../../models/goal.model';
import { GoalsService } from '../../services/state/goals.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-edit-goal-modal',
  templateUrl: './create-edit-goal-modal.component.html',
  styleUrls: ['./create-edit-goal-modal.component.scss'],
})
export class CreateEditGoalModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Goal>;

  goal?: Goal;
  isVisible: boolean = false;
  equalityDrownDown = EqualityDropDown;
  lengthOfTimeDrownDown = LengthOfTimeDropDown;
  saving = false;
  deleting = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private goalsService: GoalsService,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((goal) => {
      this.goal = goal.id === 0 ? goal : createGoal(goal);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveGoal() {
    if (!this.goal) {
      return;
    }
    this.saving = true;
    try {
      if (this.goal.id === 0) {
        await this.goalsService.createNewGoal(this.goal);
      } else {
        await this.goalsService.updateGoal(this.goal);
      }
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      this.saving = false;
      return;
    }
    this.nzMessageService.success('Goal saved!');
    this.saving = false;
    this.isVisible = false;
  }

  async deleteGoal(): Promise<void> {
    if (!this.goal) {
      return;
    }
    this.deleting = true;
    try {
      await this.goalsService.deleteGoal(this.goal);
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      return;
    }

    this.nzMessageService.success('Goal deleted!');
    this.isVisible = false;
    this.deleting = false;
  }
}
