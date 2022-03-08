import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {createGoal, EqualityDropDown, Goal, LengthOfTimeDropDown} from "../../models/goal.model";
import {GoalsService} from "../../services/state/goals.service";

@Component({
  selector: 'app-create-edit-goal-modal',
  templateUrl: './create-edit-goal-modal.component.html',
  styleUrls: ['./create-edit-goal-modal.component.scss']
})
export class CreateEditGoalModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Goal>;

  goal!: Goal;
  isVisible: boolean = false;
  equalityDrownDown = EqualityDropDown;
  lengthOfTimeDrownDown = LengthOfTimeDropDown;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private goalsService: GoalsService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe((goal) => {
      this.goal = goal.id === 0 ? goal : createGoal(goal);
      this.isVisible = true;
    })
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveGoal() {
    this.saving = true;
    try {
      await this.goalsService.createNewGoal(this.goal);
    } catch (e) {
      console.log(e);
      this.saving = false;
      return;
    }
    this.isVisible = false;
  }
}
