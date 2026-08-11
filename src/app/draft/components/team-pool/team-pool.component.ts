import { Component, Input, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzSegmentedComponent } from 'ng-zorro-antd/segmented';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzImage, NzImageService } from 'ng-zorro-antd/image';
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
  imports: [AsyncPipe, FormsModule, NzSegmentedComponent, NzButtonComponent],
})
export class TeamPoolComponent {
  private draftService = inject(DraftService);
  draftCacheService = inject(DraftCacheService);
  private nzMessageService = inject(NzMessageService);
  private nzModalService = inject(NzModalService);
  private nzImageService = inject(NzImageService);

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

  /**
   * The arrows traverse the filtered set the grid is showing, not every
   * team — agreed 2026-08-11, so the viewer and the grid never disagree
   * about what list is being looked at.
   */
  viewImage(team: DraftTeam): void {
    const teamsWithImages = this.filteredTeams().filter((t) => t.hasImage);
    const startIndex = teamsWithImages.findIndex((t) => t.id === team.id);
    const images: NzImage[] = teamsWithImages.map((t) => ({ src: this.imageUrl(t), alt: t.name }));

    const ref = this.nzImageService.preview(images);
    if (startIndex > 0) {
      ref.switchTo(startIndex);
    }
  }

  pickedBy(team: DraftTeam): string | undefined {
    const pick = this.draft.draftPicks.find((p) => p.draftTeamId === team.id);
    if (!pick) {
      return undefined;
    }
    return this.draft.draftMembers.find((m) => m.id === pick.draftMemberId)?.name ?? 'Someone';
  }

  confirmPick(team: DraftTeam, isMyTurn: boolean | null): void {
    this.nzModalService.confirm({
      nzTitle: 'Are you sure?',
      nzContent: `Pick ${team.name}?`,
      nzOkText: 'Pick',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.pick(team, isMyTurn),
    });
  }

  private async pick(team: DraftTeam, isMyTurn: boolean | null): Promise<void> {
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
