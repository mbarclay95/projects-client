import { Component, computed, inject, input } from '@angular/core';
import { Backup } from '../../models/backup.model';
import { BackupStep, createBackupStep, isS3Upload, isTarZip } from '../../models/backup-step.model';
import { faGripVertical, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Target } from '../../models/target.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BackupsSignalStore } from '../../services/backups-signal-store';
import { TargetSignalStore } from '../../services/target-signal-store';
import { NzDrawerComponent, NzDrawerContentDirective } from 'ng-zorro-antd/drawer';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { SortGenericPipe } from '../../../shared/pipes/sort-generic.pipe';

@Component({
  selector: 'app-create-edit-backups-drawer',
  templateUrl: './create-edit-backups-drawer.component.html',
  styleUrls: ['./create-edit-backups-drawer.component.scss'],
  imports: [
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    FaIconComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzDividerComponent,
    NzButtonComponent,
    SortGenericPipe,
  ],
})
export class CreateEditBackupsDrawerComponent {
  readonly openDrawer = input.required<Backup | undefined>();
  readonly isVisible = computed(() => {
    this.backup = this.openDrawer();
    return !!this.backup;
  });

  backup?: Backup;
  plus = faPlus;
  grip = faGripVertical;
  delete = faTrash;

  protected readonly isTarZip = isTarZip;
  protected readonly isS3Upload = isS3Upload;

  readonly backupStore = inject(BackupsSignalStore);
  readonly targetStore = inject(TargetSignalStore);

  constructor(private nzMessageService: NzMessageService) {}

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
    this.targetStore.createEntity();
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
    this.backupStore.clearCreateEditEntity();
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
