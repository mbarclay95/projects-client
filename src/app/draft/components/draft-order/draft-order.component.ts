import { Component, computed, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Draft, DraftStatus } from '../../models/draft.model';
import { DraftCacheService } from '../../services/draft-cache.service';

@Component({
  selector: 'app-draft-order',
  templateUrl: './draft-order.component.html',
  styleUrls: ['./draft-order.component.scss'],
  imports: [NzEmptyComponent, AsyncPipe, FaIconComponent],
})
export class DraftOrderComponent {
  draftCacheService = inject(DraftCacheService);

  draft = input.required<Draft>();

  starIcon = faStar;

  isSignup = computed(() => this.draft().status === DraftStatus.signup);

  sortedMembers = computed(() => {
    const draft = this.draft();
    return draft.status === DraftStatus.signup
      ? [...draft.draftMembers].sort((a, b) => a.id - b.id)
      : [...draft.draftMembers].sort((a, b) => (a.pickPosition ?? Number.MAX_SAFE_INTEGER) - (b.pickPosition ?? Number.MAX_SAFE_INTEGER));
  });

  heading = computed(() => {
    if (this.isSignup()) {
      return "Who's In";
    }
    const draft = this.draft();
    if (draft.status === DraftStatus.complete && draft.totalRounds === 1) {
      return 'Results';
    }
    return 'Pick Order';
  });

  /**
   * A2 makes every draft creatable from the UI one round, so this is the
   * only view most participants ever see — the multi-round Board and My
   * Roster it replaces are unaffected and keep rendering for
   * totalRounds > 1.
   */
  showPicks = computed(() => !this.isSignup() && this.draft().totalRounds === 1);

  pickedTeamName(memberId: number): string | undefined {
    const draft = this.draft();
    const pick = draft.draftPicks.find((p) => p.draftMemberId === memberId);
    if (!pick) {
      return undefined;
    }
    return draft.draftTeams.find((t) => t.id === pick.draftTeamId)?.name;
  }
}
