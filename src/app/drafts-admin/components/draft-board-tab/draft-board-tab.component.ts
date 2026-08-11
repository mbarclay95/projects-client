import { Component, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, EMPTY, map, switchMap, timer } from 'rxjs';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { Draft, DraftStatus, currentRound, draftIsComplete, nextPickNumber, onTheClockMemberId } from '../../models/draft.model';
import { DraftPick } from '../../models/draft-pick.model';
import { DraftPickTarget, DraftPickTeamModalComponent } from '../draft-pick-team-modal/draft-pick-team-modal.component';
import { DraftsSignalStore } from '../../services/drafts-signal-store';

@Component({
  selector: 'app-draft-board-tab',
  templateUrl: './draft-board-tab.component.html',
  styleUrls: ['./draft-board-tab.component.scss'],
  imports: [FaIconComponent, NzPopconfirmDirective, NzEmptyComponent, NzButtonComponent, DraftPickTeamModalComponent],
})
export class DraftBoardTabComponent {
  draft = input.required<Draft>();

  readonly draftsStore = inject(DraftsSignalStore);

  undoIcon = faRotateLeft;

  /**
   * Nothing to run before the draft has left signup/locked — showing an
   * empty board there would look broken rather than merely early.
   */
  hasStarted = computed(() => this.draft().status === DraftStatus.inProgress || this.draft().status === DraftStatus.complete);

  isComplete = computed(() => draftIsComplete(this.draft()));
  currentRoundNumber = computed(() => currentRound(this.draft()));
  currentPickNumber = computed(() => nextPickNumber(this.draft()));
  onTheClockId = computed(() => onTheClockMemberId(this.draft()));
  onTheClockMember = computed(() => this.draft().draftMembers.find((member) => member.id === this.onTheClockId()));

  orderedMembers = computed(() =>
    [...this.draft().draftMembers].sort(
      (a, b) => (a.pickPosition ?? Number.MAX_SAFE_INTEGER) - (b.pickPosition ?? Number.MAX_SAFE_INTEGER),
    ),
  );

  /** Only this pick number gets an undo control — the max-pick_number rule the backend enforces. */
  highestPickNumber = computed(() => Math.max(0, ...this.draft().draftPicks.map((pick) => pick.pickNumber)));

  pickerTarget = signal<DraftPickTarget | undefined>(undefined);

  /**
   * Polls only while in_progress, mirroring the public page's own poll —
   * without it the admin's board silently lies whenever a participant is the
   * one picking. loadOne() upserts the whole draft entity, which is safe to
   * do from here specifically because canEditOrder is false during
   * in_progress: DraftOrderTabComponent.orderedMembers holds unsaved drag
   * state in a linkedSignal that this same upsert would otherwise reset out
   * from under an admin mid-drag.
   */
  constructor() {
    toObservable(this.draft)
      .pipe(
        map((draft) => ({ id: draft.id, status: draft.status })),
        distinctUntilChanged((prev, curr) => prev.id === curr.id && prev.status === curr.status),
        switchMap(({ id, status }) => (status === DraftStatus.inProgress ? timer(0, 2000).pipe(map(() => id)) : EMPTY)),
        takeUntilDestroyed(),
      )
      .subscribe((draftId) => this.draftsStore.loadOne({ entityId: draftId }));
  }

  picksFor(memberId: number): DraftPick[] {
    return this.draft()
      .draftPicks.filter((pick) => pick.draftMemberId === memberId)
      .sort((a, b) => a.pickNumber - b.pickNumber);
  }

  teamName(teamId: number): string {
    return this.draft().draftTeams.find((team) => team.id === teamId)?.name ?? 'Unknown team';
  }

  openPickForClock(): void {
    this.pickerTarget.set({ mode: 'new' });
  }

  openCorrect(pick: DraftPick): void {
    this.pickerTarget.set({ mode: 'correct', pick });
  }

  undo(pick: DraftPick): void {
    this.draftsStore.deleteDraftPickHttp({ pick });
  }
}
