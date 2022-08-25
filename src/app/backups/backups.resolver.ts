import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {TargetsService} from "./services/targets/state/targets.service";
import {BackupsService} from "./services/backups/state/backups.service";
import {BackupsPollingService} from "./services/backups-polling.service";
import {ScheduledBackupsService} from "./services/scheduled-backups/state/scheduled-backups.service";
import {MobileFooterService} from "../shared/services/mobile-footer.service";

@Injectable({
  providedIn: 'root'
})
export class BackupsResolver implements Resolve<void> {

  constructor(
    private backupsService: BackupsService,
    private targetsService: TargetsService,
    private scheduledBackupsService: ScheduledBackupsService,
    private backupsPollingService: BackupsPollingService,
    private mobileFooterService: MobileFooterService
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.backupsService.getBackups();
    await this.targetsService.getTargets();
    await this.scheduledBackupsService.getScheduledBackups();
    this.mobileFooterService.setFooterButtons([]);
    // this.backupsPollingService.startPolling();
  }
}
