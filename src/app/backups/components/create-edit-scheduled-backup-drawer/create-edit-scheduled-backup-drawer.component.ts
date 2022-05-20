import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Backup} from "../../models/backup.model";
import {faGripVertical, faPlus} from "@fortawesome/free-solid-svg-icons";
import {createTarget, Target} from "../../models/target.model";
import {daysOfMonth, daysOfWeek, ScheduledBackup} from "../../models/scheduled-backup.model";
import {createBackupStep} from "../../models/backup-step.model";
import {createScheduledBackupStep} from "../../models/scheduled-backup-step.model";
import {TargetsQuery} from "../../services/targets/state/targets.query";
import {BackupsService} from "../../services/backups/state/backups.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {ScheduledBackupsService} from "../../services/scheduled-backups/state/scheduled-backups.service";

@Component({
  selector: 'app-create-edit-scheduled-backup-drawer',
  templateUrl: './create-edit-scheduled-backup-drawer.component.html',
  styleUrls: ['./create-edit-scheduled-backup-drawer.component.scss']
})
export class CreateEditScheduledBackupDrawerComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<ScheduledBackup>;

  isVisible: boolean = false;
  scheduledBackup!: ScheduledBackup;
  plus = faPlus;
  grip = faGripVertical;
  openTargetModal: Subject<{target: Target, backupStepId: number}> = new Subject<{target: Target, backupStepId: number}>();
  saving: boolean = false;
  daysOfWeek = daysOfWeek;
  daysOfMonth = daysOfMonth;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    public targetsQuery: TargetsQuery,
    private scheduledBackupsService: ScheduledBackupsService,
    private nzMessageService: NzMessageService,
  ) { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(scheduledBackup => {
      this.scheduledBackup = scheduledBackup;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  selectNewTarget({target, backupStepId}: {target: Target, backupStepId: number}): void {
    const backupStep = this.scheduledBackup.scheduledBackupSteps.find(step => step.id === backupStepId);
    if (backupStep) {
      backupStep.target = target;
    }
  }

  addScheduledBackupStep() {
    const sort = this.scheduledBackup.scheduledBackupSteps.length + 1;
    this.scheduledBackup.scheduledBackupSteps.push(createScheduledBackupStep({id: sort, sort}));
  }

  targetCompare(a: Target, b: Target): boolean {
    return a?.id === b?.id
  }

  createNewTarget(backupStepId: number) {
    this.openTargetModal.next({target: createTarget({id: 0}), backupStepId});
  }

  async saveScheduledBackup() {
    this.saving = true;
    try {
      await this.scheduledBackupsService.createNewBackups(this.scheduledBackup);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error("There was an error saving the backup.");
      return;
    }

    this.nzMessageService.success("Backup Saved!");
    this.saving = false;
    this.isVisible = false;
  }

  changeScheduleMode(mode: 'weekly'|'monthly') {
    if (mode === 'weekly') {
      this.scheduledBackup.schedule = {
        mode: 'weekly',
        dayOfWeek: []
      };
    }
    if (mode === 'monthly') {
      this.scheduledBackup.schedule = {
        mode: 'monthly',
        dayOfMonth: []
      };
    }
  }
}
