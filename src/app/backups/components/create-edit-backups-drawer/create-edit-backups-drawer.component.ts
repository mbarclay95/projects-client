import { Component, effect, inject, Input, Signal } from '@angular/core';
import { Backup } from '../../models/backup.model';
import { BackupStep, createBackupStep, isS3Upload, isTarZip } from '../../models/backup-step.model';
import { faGripVertical, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Target } from '../../models/target.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackupsSignalStore } from '../../services/backups-signal-store';
import { TargetSignalStore } from '../../services/target-signal-store';

@Component({
  selector: 'app-create-edit-backups-drawer',
  templateUrl: './create-edit-backups-drawer.component.html',
  styleUrls: ['./create-edit-backups-drawer.component.scss'],
  standalone: false,
})
export class CreateEditBackupsDrawerComponent {
  @Input() openDrawer!: Signal<Backup | undefined>;

  isVisible: boolean = false;
  backup?: Backup;
  plus = faPlus;
  grip = faGripVertical;
  delete = faTrash;

  protected readonly isTarZip = isTarZip;
  protected readonly isS3Upload = isS3Upload;

  readonly backupStore = inject(BackupsSignalStore);
  readonly targetStore = inject(TargetSignalStore);

  constructor(private nzMessageService: NzMessageService) {
    effect(() => {
      this.backup = this.openDrawer();
      this.isVisible = !!this.backup;
    });
  }

  selectNewTarget({ target, backupStepId }: { target: Target; backupStepId: number }): void {
    // const backupStep = this.backup.backupSteps.find(step => step.id === backupStepId);
    // if (backupStep) {
    //   backupStep.target = target;
    // }
  }

  addBackupStep() {
    if (this.backup) {
      const sort = this.backup.backupSteps.length + 1;
      this.backup.backupSteps = [...this.backup.backupSteps, ...[createBackupStep({ id: sort * -1, sort })]];
    }
  }

  targetCompare(a: Target, b: Target): boolean {
    return a?.id === b?.id;
  }

  createNewTarget(backupStepId: number) {
    this.targetStore.setSelectedEntity(0);
  }

  async saveBackup() {
    if (!this.backup) {
      return;
    }
    this.backup.id === 0
      ? this.backupStore.create({ entity: this.backup, onSuccess: this.backupSaved })
      : this.backupStore.update({ entity: this.backup, onSuccess: this.backupSaved });
  }

  backupSaved(): void {
    this.backupStore.startPolling();
    this.nzMessageService.success('Backup Saved!');
    this.backupStore.clearSelectedEntity();
  }

  removeBackupStep(backupStep: BackupStep): void {
    if (!this.backup) {
      return;
    }
    const sort = backupStep.sort;
    this.backup.backupSteps = this.backup.backupSteps
      .filter((bs) => bs.id !== backupStep.id)
      .map((bs) => {
        if (bs.sort > sort) {
          bs.sort--;
        }

        return bs;
      });
  }
}
