import { Component, inject, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Draft } from '../../models/draft.model';
import { DraftPick } from '../../models/draft-pick.model';
import { DraftCacheService } from '../../services/draft-cache.service';

@Component({
  selector: 'app-my-roster',
  templateUrl: './my-roster.component.html',
  styleUrls: ['./my-roster.component.scss'],
  imports: [NzEmptyComponent, AsyncPipe],
})
export class MyRosterComponent {
  draftCacheService = inject(DraftCacheService);

  draft = input.required<Draft>();

  myPicks(draftMemberId: number): DraftPick[] {
    return this.draft().draftPicks.filter((pick) => pick.draftMemberId === draftMemberId);
  }

  teamName(draftTeamId: number): string {
    return this.draft().draftTeams.find((t) => t.id === draftTeamId)?.name ?? 'Unknown team';
  }
}
