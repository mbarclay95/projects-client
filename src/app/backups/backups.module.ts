import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackupsRoutingModule } from './backups-routing.module';
import { BackupsLayoutComponent } from './backups-layout/backups-layout.component';
import { BackupsPageComponent } from './pages/backups-page/backups-page.component';
import { ScheduledBackupsPageComponent } from './pages/scheduled-backups-page/scheduled-backups-page.component';
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzButtonModule} from "ng-zorro-antd/button";
import { BackupTabsComponent } from './pages/backup-tabs/backup-tabs.component';
import { CreateEditBackupsDrawerComponent } from './components/create-edit-backups-drawer/create-edit-backups-drawer.component';
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import {FormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDividerModule} from "ng-zorro-antd/divider";
import { CreateEditTargetModalComponent } from './components/create-edit-target-modal/create-edit-target-modal.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import { BackupsTableComponent } from './components/backups-table/backups-table.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzStepsModule} from "ng-zorro-antd/steps";
import { BackupStatusPipe } from './pipes/backup-status.pipe';
import { BackupRunTimePipe } from './pipes/backup-run-time.pipe';
import {NzCollapseModule} from "ng-zorro-antd/collapse";
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { TargetsPageComponent } from './pages/targets-page/targets-page.component';
import { TargetsTableComponent } from './components/targets-table/targets-table.component';
import { ScheduledBackupsTableComponent } from './components/scheduled-backups-table/scheduled-backups-table.component';
import { CreateEditScheduledBackupDrawerComponent } from './components/create-edit-scheduled-backup-drawer/create-edit-scheduled-backup-drawer.component';
import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzPopconfirmDirective} from 'ng-zorro-antd/popconfirm';
import {SortBackupStepsPipe} from './pipes/sort-backup-steps.pipe';


@NgModule({
  declarations: [
    BackupsLayoutComponent,
    BackupsPageComponent,
    ScheduledBackupsPageComponent,
    BackupTabsComponent,
    CreateEditBackupsDrawerComponent,
    CreateEditTargetModalComponent,
    BackupsTableComponent,
    BackupStatusPipe,
    BackupRunTimePipe,
    StatusIconComponent,
    TargetsPageComponent,
    TargetsTableComponent,
    ScheduledBackupsTableComponent,
    CreateEditScheduledBackupDrawerComponent
  ],
    imports: [
        CommonModule,
        BackupsRoutingModule,
        NzLayoutModule,
        NzTabsModule,
        NzButtonModule,
        NzDrawerModule,
        FormsModule,
        NzInputModule,
        FontAwesomeModule,
        NzSwitchModule,
        NzSelectModule,
        NzDividerModule,
        NzModalModule,
        NzTableModule,
        NzStepsModule,
        NzCollapseModule,
        NzInputNumberModule,
        NzRadioModule,
        NzPopconfirmDirective,
        SortBackupStepsPipe
    ]
})
export class BackupsModule { }
