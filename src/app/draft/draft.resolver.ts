import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { DraftService } from './services/draft.service';
import { DraftCacheService } from './services/draft-cache.service';

@Injectable({
  providedIn: 'root',
})
export class DraftResolver {
  private draftService = inject(DraftService);
  private draftCacheService = inject(DraftCacheService);
  private router = inject(Router);

  async resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Promise<void> {
    const draftId = route.params['draftId'] as string | undefined;
    const token = route.queryParams['token'] as string | undefined;
    if (draftId && token) {
      try {
        await this.draftService.getDraft(draftId, token);
      } catch (_e) {
        await this.router.navigateByUrl('draft');
        return;
      }
    }

    if (this.draftService.draftNotLoaded()) {
      await this.router.navigateByUrl('draft');
      return;
    }
    this.draftCacheService.loadDraftCache();
  }
}
