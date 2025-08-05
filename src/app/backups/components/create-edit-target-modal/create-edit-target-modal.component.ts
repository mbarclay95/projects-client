import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { createTarget, Target } from '../../models/target.model';
import { TargetsService } from '../../services/targets/state/targets.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-create-edit-target-modal',
  templateUrl: './create-edit-target-modal.component.html',
  styleUrls: ['./create-edit-target-modal.component.scss'],
  standalone: false,
})
export class CreateEditTargetModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<{ target: Target; backupStepId?: number }>;
  @Output() selectNewTarget: EventEmitter<{ target: Target; backupStepId: number }> = new EventEmitter<{
    target: Target;
    backupStepId: number;
  }>();

  target?: Target;
  backupStepId?: number;
  isVisible: boolean = false;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private targetsService: TargetsService,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe(({ target, backupStepId }) => {
      this.target = target.id === 0 ? target : createTarget(target);
      this.backupStepId = backupStepId;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveTarget() {
    this.saving = true;
    if (!this.target) {
      return;
    }
    try {
      const newTarget =
        this.target.id === 0 ? await this.targetsService.createNewTarget(this.target) : await this.targetsService.updateTarget(this.target);
      if (this.backupStepId !== undefined) {
        this.selectNewTarget.emit({ target: newTarget, backupStepId: this.backupStepId });
      }
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error('There was an error saving the target.');
      return;
    }
    this.nzMessageService.success('Target Saved!');
    this.saving = false;
    this.isVisible = false;
  }
}
