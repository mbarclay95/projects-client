import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, filter, pairwise, withLatestFrom } from 'rxjs';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule, NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DraftService } from '../../services/draft.service';
import { draftNotices } from '../../services/draft-notices';
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
  private nzMessageService = inject(NzMessageService);
  private nzModalService = inject(NzModalService);
  private myTurnModal?: NzModalRef;

  draftStatus = DraftStatus;
  moreIcon = faEllipsisV;
  openSignupModal = signal(false);
  openClaimModal = signal(false);
  celebrating = signal(false);
  flashTeamIds = signal<Set<number>>(new Set());

  // The real trigger needs a draft to actually finish, which isn't something
  // you can stage on demand. Dev builds only — `ng build` swaps in
  // environment.prod.ts, where this is false.
  showFireworksTest = !environment.production;

  /**
   * Marked as celebrated the moment it starts, not when the animation ends,
   * so a reload part-way through doesn't replay it. Everyone watching when
   * the last pick lands sees this within a poll tick of each other; anyone
   * arriving later gets it once, on their first look at the finished draft.
   *
   * The mark is dropped again whenever the draft is seen unfinished, so an
   * admin undoing the final pick and the draft finishing again celebrates a
   * second time rather than going silent for good.
   */
  constructor() {
    this.draftService.draft$
      .pipe(filter(Boolean), pairwise(), withLatestFrom(this.draftCacheService.me$), takeUntilDestroyed())
      .subscribe(([[previous, current], me]) => {
        for (const notice of draftNotices(previous, current, me?.draftMemberId)) {
          this.nzMessageService.info(`${notice.memberName} took ${notice.teamName}`, { nzDuration: 4000 });
          this.flashTeamIds.update((ids) => new Set([...ids, notice.teamId]));
          setTimeout(() => {
            this.flashTeamIds.update((ids) => new Set([...ids].filter((id) => id !== notice.teamId)));
          }, 2000);
        }
      });

    this.draftCacheService.isMyTurn$
      .pipe(distinctUntilChanged(), takeUntilDestroyed())
      .subscribe((isMyTurn) => this.onMyTurnChanged(isMyTurn));

    this.draftService.draft$.pipe(takeUntilDestroyed()).subscribe((draft) => {
      if (!draft) {
        return;
      }

      if (draft.status !== DraftStatus.complete) {
        this.draftCacheService.clearCelebrated(draft.id);
        return;
      }

      if (this.draftCacheService.hasCelebrated(draft.id)) {
        return;
      }

      this.draftCacheService.markCelebrated(draft.id);
      this.celebrating.set(true);
    });
  }

  onMyTurnChanged(isMyTurn: boolean): void {
    if (isMyTurn) {
      if (this.myTurnModal) {
        return;
      }

      const ref = this.nzModalService.info({
        nzTitle: "It's your turn!",
        nzContent: 'Pick a team from the pool.',
        nzOkText: 'Got it',
      });
      this.myTurnModal = ref;
      ref.afterClose.subscribe(() => {
        if (this.myTurnModal === ref) {
          this.myTurnModal = undefined;
        }
      });
      return;
    }

    this.myTurnModal?.close();
    this.myTurnModal = undefined;
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

  /**
   * Signup and locked only: once picking starts the page is about the board,
   * and the banner would push it below the fold. The backend serves the image
   * in every status — this is the whole of the rule.
   */
  showImage(draft: Draft): boolean {
    return draft.hasImage && (draft.status === DraftStatus.signup || draft.status === DraftStatus.locked);
  }

  imageUrl(draft: Draft): string {
    return `${environment.publicApiUrl}/drafts/${draft.id}/image?token=${this.draftService.getToken()}`;
  }
}
