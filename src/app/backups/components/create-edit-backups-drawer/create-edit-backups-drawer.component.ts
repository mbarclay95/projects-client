import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {Backup, createBackup} from "../../models/backup.model";
import {BackupStep, createBackupStep, isS3Upload, isTarZip} from "../../models/backup-step.model";
import {faEdit, faGripVertical, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {TargetsQuery} from "../../services/targets/state/targets.query";
import {createTarget, Target} from "../../models/target.model";
import {NzMessageService} from "ng-zorro-antd/message";
import {BackupsService} from "../../services/backups/state/backups.service";
import {BackupsPollingService} from "../../services/backups-polling.service";

@Component({
  selector: 'app-create-edit-backups-drawer',
  templateUrl: './create-edit-backups-drawer.component.html',
  styleUrls: ['./create-edit-backups-drawer.component.scss']
})
export class CreateEditBackupsDrawerComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Backup>;

  isVisible: boolean = false;
  backup?: Backup;
  plus = faPlus;
  grip = faGripVertical;
  delete = faTrash;
  openTargetModal: Subject<{ target: Target, backupStepId: number }> = new Subject<{
    target: Target,
    backupStepId: number
  }>();
  saving: boolean = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  protected readonly isTarZip = isTarZip;
  protected readonly isS3Upload = isS3Upload;

  constructor(
    public targetsQuery: TargetsQuery,
    private backupsService: BackupsService,
    private nzMessageService: NzMessageService,
    private backupsPollingService: BackupsPollingService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(backup => {
      this.backup = createBackup(backup);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  selectNewTarget({target, backupStepId}: { target: Target, backupStepId: number }): void {
    // const backupStep = this.backup.backupSteps.find(step => step.id === backupStepId);
    // if (backupStep) {
    //   backupStep.target = target;
    // }
  }

  addBackupStep() {
    if (this.backup) {
      const sort = this.backup.backupSteps.length + 1;
      this.backup.backupSteps.push(createBackupStep({id: sort * -1, sort}));
    }
  }

  targetCompare(a: Target, b: Target): boolean {
    return a?.id === b?.id
  }

  createNewTarget(backupStepId: number) {
    this.openTargetModal.next({target: createTarget({id: 0}), backupStepId});
  }

  async saveBackup() {
    if (!this.backup) {
      return;
    }
    this.saving = true;
    try {
      this.backup.id === 0 ?
        await this.backupsService.createNewBackups(this.backup) :
        await this.backupsService.updateBackups(this.backup);
      this.backupsPollingService.startPolling();
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error("There was an error saving the backup.");
      return;
    }

    this.nzMessageService.success("Backup Saved!");
    this.saving = false;
    this.isVisible = false;
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
