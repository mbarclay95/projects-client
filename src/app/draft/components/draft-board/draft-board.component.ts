import { Component, Input } from '@angular/core';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Draft } from '../../models/draft.model';
import { DraftPick } from '../../models/draft-pick.model';

@Component({
  selector: 'app-draft-board',
  templateUrl: './draft-board.component.html',
  styleUrls: ['./draft-board.component.scss'],
  imports: [NzEmptyComponent],
})
export class DraftBoardComponent {
  @Input({ required: true }) draft!: Draft;

  round(pick: DraftPick): number {
    const memberCount = this.draft.draftMembers.length;
    if (memberCount === 0) {
      return 1;
    }
    return Math.floor((pick.pickNumber - 1) / memberCount) + 1;
  }

  teamName(draftTeamId: number): string {
    return this.draft.draftTeams.find((t) => t.id === draftTeamId)?.name ?? 'Unknown team';
  }

  memberName(draftMemberId: number): string {
    return this.draft.draftMembers.find((m) => m.id === draftMemberId)?.name ?? 'Unknown member';
  }
}
