import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {TargetsService} from "./services/targets/state/targets.service";
import {BackupsService} from "./services/backups/state/backups.service";
import {BackupsPollingService} from "./services/backups-polling.service";

@Injectable({
  providedIn: 'root'
})
export class BackupsResolver implements Resolve<void> {

  constructor(
    private backupsService: BackupsService,
    private targetsService: TargetsService,
    private backupsPollingService: BackupsPollingService,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<void> {
    await this.backupsService.getBackups();
    await this.targetsService.getTargets();
    // this.backupsPollingService.startPolling();
  }
}
