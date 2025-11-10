import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Target } from '../../models/target.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { TargetSignalStore } from '../../services/target-signal-store';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-target-modal',
  templateUrl: './create-edit-target-modal.component.html',
  styleUrls: ['./create-edit-target-modal.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, NzInputDirective, ReactiveFormsModule, FormsModule],
})
export class CreateEditTargetModalComponent extends DefaultModalSignalComponent<Target> {
  @Input() backupStepId?: number;
  @Output() selectNewTarget: EventEmitter<{ target: Target; backupStepId: number }> = new EventEmitter<{
    target: Target;
    backupStepId: number;
  }>();

  readonly targetStore = inject(TargetSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  saveTarget() {
    if (!this.model) {
      return;
    }
    this.model.id === 0
      ? this.targetStore.create({ entity: this.model, onSuccess: this.targetSaved })
      : this.targetStore.update({ entity: this.model, onSuccess: this.targetSaved });
  }

  private targetSaved(newTarget: Target): void {
    this.nzMessageService.success('Target Saved!');
    this.targetStore.clearCreateEditEntity();
    if (this.backupStepId !== undefined) {
      this.selectNewTarget.emit({ target: newTarget, backupStepId: this.backupStepId });
    }
  }
}
