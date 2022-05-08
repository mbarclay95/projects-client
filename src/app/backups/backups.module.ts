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


@NgModule({
  declarations: [
    BackupsLayoutComponent,
    BackupsPageComponent,
    ScheduledBackupsPageComponent,
    BackupTabsComponent,
    CreateEditBackupsDrawerComponent,
    CreateEditTargetModalComponent,
    BackupsTableComponent
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
        NzStepsModule
    ]
})
export class BackupsModule { }
