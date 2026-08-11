import { Component, computed, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { Draft } from '../../models/draft.model';
import { DraftPick } from '../../models/draft-pick.model';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';

/**
 * `{ mode: 'new' }` picks for whoever is on the clock; `{ mode: 'correct',
 * pick }` corrects an existing pick's team. One modal, since the two acts
 * share everything but which store method they call and which team starts
 * pre-selected.
 */
export type DraftPickTarget = { mode: 'new' } | { mode: 'correct'; pick: DraftPick };

@Component({
  selector: 'app-draft-pick-team-modal',
  templateUrl: './draft-pick-team-modal.component.html',
  styleUrls: ['./draft-pick-team-modal.component.scss'],
  imports: [FormsModule, NzModalComponent, NzModalContentDirective, NzRadioGroupComponent, NzRadioComponent],
})
export class DraftPickTeamModalComponent extends DefaultModalSignalComponent<DraftPickTarget> {
  draft = input.required<Draft>();
  closed = output<void>();

  readonly draftsStore = inject(DraftsSignalStore);

  selectionError = false;
  selectedTeamId?: number;

  /**
   * Unpicked teams, plus — for a correction — the team the pick already
   * holds, so re-selecting it is possible and reads as "leave it".
   */
  candidateTeams = computed(() => {
    const target = this.openModal();
    if (!target) {
      return [];
    }

    const pickedTeamIds = new Set(this.draft().draftPicks.map((pick) => pick.draftTeamId));
    const unpicked = this.draft().draftTeams.filter((team) => !pickedTeamIds.has(team.id));

    if (target.mode === 'correct') {
      const currentTeam = this.draft().draftTeams.find((team) => team.id === target.pick.draftTeamId);
      if (currentTeam && !unpicked.some((team) => team.id === currentTeam.id)) {
        return [currentTeam, ...unpicked];
      }
    }

    return unpicked;
  });

  override onOpenModal(): void {
    this.selectedTeamId = this.model?.mode === 'correct' ? this.model.pick.draftTeamId : undefined;
    this.selectionError = false;
  }

  confirm(): void {
    const target = this.openModal();
    if (!target || !this.selectedTeamId) {
      this.selectionError = true;
      return;
    }

    if (target.mode === 'new') {
      this.draftsStore.createDraftPickHttp({
        draftId: this.draft().id,
        draftTeamId: this.selectedTeamId,
        onSuccess: () => this.closed.emit(),
      });
    } else {
      this.draftsStore.updateDraftPickHttp({
        pick: target.pick,
        draftTeamId: this.selectedTeamId,
        onSuccess: () => this.closed.emit(),
      });
    }
  }
}
