import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import {TargetsService} from "./services/targets/state/targets.service";
import {BackupsService} from "./services/backups/state/backups.service";
import {ScheduledBackupsService} from "./services/scheduled-backups/state/scheduled-backups.service";

@Injectable({
  providedIn: 'root'
})
export class BackupsResolver  {

  constructor(
    private backupsService: BackupsService,
    private targetsService: TargetsService,
    private scheduledBackupsService: ScheduledBackupsService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.backupsService.getBackups();
    await this.targetsService.getTargets();
    await this.scheduledBackupsService.getScheduledBackups();
    // this.backupsPollingService.startPolling();
  }
}
