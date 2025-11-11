import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { createTarget, Target } from '../../models/target.model';
import { daysOfMonth, daysOfWeek, Schedule } from '../../models/schedule.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { TargetSignalStore } from '../../services/target-signal-store';
import { SchedulesSignalStore } from '../../services/schedules-signal-store';
import { NzDrawerComponent, NzDrawerContentDirective } from 'ng-zorro-antd/drawer';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CreateEditTargetModalComponent } from '../create-edit-target-modal/create-edit-target-modal.component';

@Component({
  selector: 'app-create-edit-scheduled-backup-drawer',
  templateUrl: './create-edit-scheduled-backup-drawer.component.html',
  styleUrls: ['./create-edit-scheduled-backup-drawer.component.scss'],
  imports: [
    NzDrawerComponent,
    NzDrawerContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzRadioGroupComponent,
    NzRadioComponent,
    NzSelectComponent,
    NzOptionComponent,
    NzInputNumberComponent,
    NzButtonComponent,
    FaIconComponent,
    CreateEditTargetModalComponent,
  ],
})
export class CreateEditScheduledBackupDrawerComponent implements OnInit, OnDestroy {
  private nzMessageService = inject(NzMessageService);

  @Input() openModal!: Observable<Schedule>;

  isVisible = false;
  scheduledBackup!: Schedule;
  plus = faPlus;
  grip = faGripVertical;
  openTargetModal: Subject<{ target: Target; backupStepId: number }> = new Subject<{ target: Target; backupStepId: number }>();
  saving = false;
  daysOfWeek = daysOfWeek;
  daysOfMonth = daysOfMonth;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  readonly targetStore = inject(TargetSignalStore);
  readonly schedulesStore = inject(SchedulesSignalStore);

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((scheduledBackup) => {
      this.scheduledBackup = scheduledBackup;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectNewTarget({ target, backupStepId }: { target: Target; backupStepId: number }): void {
    // const backupStep = this.scheduledBackup.scheduledBackupSteps.find(step => step.id === backupStepId);
    // if (backupStep) {
    //   backupStep.target = target;
    // }
  }

  addScheduledBackupStep() {
    // const sort = this.scheduledBackup.scheduledBackupSteps.length + 1;
    // this.scheduledBackup.scheduledBackupSteps.push(createScheduledBackupStep({id: sort, sort}));
  }

  targetCompare(a: Target, b: Target): boolean {
    return a?.id === b?.id;
  }

  createNewTarget(backupStepId: number) {
    this.openTargetModal.next({ target: createTarget({ id: 0 }), backupStepId });
  }

  async saveScheduledBackup() {
    this.saving = true;
    try {
      this.schedulesStore.create({ entity: this.scheduledBackup });
    } catch (_e) {
      this.saving = false;
      this.nzMessageService.error('There was an error saving the backup.');
      return;
    }

    this.nzMessageService.success('Backup Saved!');
    this.saving = false;
    this.isVisible = false;
  }

  changeScheduleMode(mode: 'weekly' | 'monthly') {
    if (mode === 'weekly') {
      this.scheduledBackup.schedule = {
        mode: 'weekly',
        dayOfWeek: [],
      };
    }
    if (mode === 'monthly') {
      this.scheduledBackup.schedule = {
        mode: 'monthly',
        dayOfMonth: [],
      };
    }
  }
}
