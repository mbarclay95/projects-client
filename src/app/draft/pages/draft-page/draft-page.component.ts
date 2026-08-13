import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { Draft, DraftStatus } from '../../models/draft.model';
import { DraftSignupModalComponent } from '../../components/draft-signup-modal/draft-signup-modal.component';
import { DraftClaimModalComponent } from '../../components/draft-claim-modal/draft-claim-modal.component';
import { DraftOrderComponent } from '../../components/draft-order/draft-order.component';
import { DraftBoardComponent } from '../../components/draft-board/draft-board.component';
import { MyRosterComponent } from '../../components/my-roster/my-roster.component';
import { TeamPoolComponent } from '../../components/team-pool/team-pool.component';
import { DraftFireworksComponent } from '../../components/draft-fireworks/draft-fireworks.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-draft-page',
  templateUrl: './draft-page.component.html',
  styleUrls: ['./draft-page.component.scss'],
  imports: [
    AsyncPipe,
    DatePipe,
    FaIconComponent,
    NzDividerComponent,
    NzButtonComponent,
    NzDropdownModule,
    NzModalModule,
    DraftSignupModalComponent,
    DraftClaimModalComponent,
    DraftOrderComponent,
    DraftBoardComponent,
    MyRosterComponent,
    TeamPoolComponent,
    DraftFireworksComponent,
  ],
})
export class DraftPageComponent {
  draftService = inject(DraftService);
  draftCacheService = inject(DraftCacheService);

  draftStatus = DraftStatus;
  moreIcon = faEllipsisV;
  openSignupModal = signal(false);
  openClaimModal = signal(false);
  celebrating = signal(false);

  // The real trigger needs a draft to actually finish, which isn't something
  // you can stage on demand. Dev builds only — `ng build` swaps in
  // environment.prod.ts, where this is false.
  showFireworksTest = !environment.production;

  /**
   * Marked as celebrated the moment it starts, not when the animation ends,
   * so a reload part-way through doesn't replay it. Everyone watching when
   * the last pick lands sees this within a poll tick of each other; anyone
   * arriving later gets it once, on their first look at the finished draft.
   */
  constructor() {
    this.draftService.draft$.pipe(takeUntilDestroyed()).subscribe((draft) => {
      if (!draft || draft.status !== DraftStatus.complete || this.draftCacheService.hasCelebrated(draft.id)) {
        return;
      }

      this.draftCacheService.markCelebrated(draft.id);
      this.celebrating.set(true);
    });
  }

  /**
   * Not gated on `me` — "I claimed the wrong name" needs this menu item as
   * much as "I have no identity" does. Kept out of the way in the header
   * dropdown rather than as a standing button, since it's a correction path
   * most visitors never need.
   */
  hasUnclaimedMembers(draft: Draft): boolean {
    return draft.draftMembers.some((m) => !m.claimed);
  }
}
