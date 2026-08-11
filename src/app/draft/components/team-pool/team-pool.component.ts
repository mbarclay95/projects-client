import { Component, Input, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzSegmentedComponent } from 'ng-zorro-antd/segmented';
import { Draft } from '../../models/draft.model';
import { DraftTeam } from '../../models/draft-team.model';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { environment } from '../../../../environments/environment';
import { isMobile } from '../../../app.component';

type TeamPoolFilter = 'All' | 'Unpicked' | 'Picked';

@Component({
  selector: 'app-team-pool',
  templateUrl: './team-pool.component.html',
  styleUrls: ['./team-pool.component.scss'],
  imports: [AsyncPipe, FormsModule, NzSegmentedComponent],
})
export class TeamPoolComponent {
  private draftService = inject(DraftService);
  draftCacheService = inject(DraftCacheService);
  private nzMessageService = inject(NzMessageService);

  @Input({ required: true }) draft!: Draft;

  isMobile = isMobile;
  picking = false;

  filterOptions: TeamPoolFilter[] = ['All', 'Unpicked', 'Picked'];
  filter = signal<TeamPoolFilter>('All');

  filteredTeams(): DraftTeam[] {
    const filter = this.filter();
    if (filter === 'All') {
      return this.draft.draftTeams;
    }
    return this.draft.draftTeams.filter((team) => !!this.pickedBy(team) === (filter === 'Picked'));
  }

  imageUrl(team: DraftTeam): string {
    return `${environment.publicApiUrl}/draft-teams/${team.id}/image?token=${this.draftService.getToken()}`;
  }

  pickedBy(team: DraftTeam): string | undefined {
    const pick = this.draft.draftPicks.find((p) => p.draftTeamId === team.id);
    if (!pick) {
      return undefined;
    }
    return this.draft.draftMembers.find((m) => m.id === pick.draftMemberId)?.name ?? 'Someone';
  }

  async pick(team: DraftTeam, isMyTurn: boolean | null): Promise<void> {
    if (!isMyTurn || this.pickedBy(team) || this.picking) {
      return;
    }

    const me = await firstValueFrom(this.draftCacheService.me$);
    if (!me) {
      return;
    }

    this.picking = true;
    try {
      await this.draftService.makePick(team.id, me.secret);
    } catch (_e) {
      // A race lost to another picker, or the draft moved on — either way
      // the next poll (or this response, once makePick resolves) corrects
      // the board. The message is the same one public-draft.md specifies
      // for the 422 this almost always is.
      this.nzMessageService.error('That team was just taken.');
    } finally {
      this.picking = false;
    }
  }
}
