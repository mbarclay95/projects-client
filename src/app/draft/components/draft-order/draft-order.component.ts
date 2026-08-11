import { Component, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Draft, DraftStatus } from '../../models/draft.model';
import { DraftMember } from '../../models/draft-member.model';
import { DraftCacheService } from '../../services/draft-cache.service';

@Component({
  selector: 'app-draft-order',
  templateUrl: './draft-order.component.html',
  styleUrls: ['./draft-order.component.scss'],
  imports: [NzEmptyComponent, AsyncPipe],
})
export class DraftOrderComponent {
  draftCacheService = inject(DraftCacheService);

  private _draft!: Draft;

  sortedMembers: DraftMember[] = [];

  @Input({ required: true })
  set draft(draft: Draft) {
    this._draft = draft;
    this.sortedMembers =
      draft.status === DraftStatus.signup
        ? [...draft.draftMembers].sort((a, b) => a.id - b.id)
        : [...draft.draftMembers].sort((a, b) => (a.pickPosition ?? Number.MAX_SAFE_INTEGER) - (b.pickPosition ?? Number.MAX_SAFE_INTEGER));
  }

  get draft(): Draft {
    return this._draft;
  }

  get isSignup(): boolean {
    return this._draft.status === DraftStatus.signup;
  }

  get heading(): string {
    if (this.isSignup) {
      return "Who's In";
    }
    if (this._draft.status === DraftStatus.complete && this._draft.totalRounds === 1) {
      return 'Results';
    }
    return 'Pick Order';
  }

  /**
   * A2 makes every draft creatable from the UI one round, so this is the
   * only view most participants ever see — the multi-round Board and My
   * Roster it replaces are unaffected and keep rendering for
   * totalRounds > 1.
   */
  get showPicks(): boolean {
    return !this.isSignup && this._draft.totalRounds === 1;
  }

  pickedTeamName(memberId: number): string | undefined {
    const pick = this._draft.draftPicks.find((p) => p.draftMemberId === memberId);
    if (!pick) {
      return undefined;
    }
    return this._draft.draftTeams.find((t) => t.id === pick.draftTeamId)?.name;
  }
}
