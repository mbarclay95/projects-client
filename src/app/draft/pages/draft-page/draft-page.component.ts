import { Component, inject, signal } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { NzButtonComponent } from 'ng-zorro-antd/button';
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

@Component({
  selector: 'app-draft-page',
  templateUrl: './draft-page.component.html',
  styleUrls: ['./draft-page.component.scss'],
  imports: [
    AsyncPipe,
    DatePipe,
    NzDividerComponent,
    NzButtonComponent,
    NzModalModule,
    DraftSignupModalComponent,
    DraftClaimModalComponent,
    DraftOrderComponent,
    DraftBoardComponent,
    MyRosterComponent,
    TeamPoolComponent,
  ],
})
export class DraftPageComponent {
  draftService = inject(DraftService);
  draftCacheService = inject(DraftCacheService);

  draftStatus = DraftStatus;
  openSignupModal = signal(false);
  openClaimModal = signal(false);

  /**
   * Not gated on `me` — "I claimed the wrong name" needs this button as much
   * as "I have no identity" does.
   */
  hasUnclaimedMembers(draft: Draft): boolean {
    return draft.draftMembers.some((m) => !m.claimed);
  }
}
