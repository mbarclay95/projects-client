import { Component, computed, effect, inject, input, linkedSignal, output } from '@angular/core';
import { Draft, DraftStatus } from '../../models/draft.model';
import { DraftMember } from '../../models/draft-member.model';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { CdkDragDrop, CdkDragHandle, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { faCircleExclamation, faGripVertical, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-draft-order-tab',
  templateUrl: './draft-order-tab.component.html',
  styleUrls: ['./draft-order-tab.component.scss'],
  imports: [CdkDropList, CdkDragHandle, DragDropModule, FaIconComponent, NzButtonComponent, NzEmptyComponent],
})
export class DraftOrderTabComponent {
  draft = input.required<Draft>();

  /** So the Order tab label can show an unsaved-changes cue without reaching into this component's internals. */
  dirtyChange = output<boolean>();

  readonly draftsStore = inject(DraftsSignalStore);

  grip = faGripVertical;
  shuffleIcon = faShuffle;
  warning = faCircleExclamation;

  /**
   * Resets to the draft's saved order whenever `draft` changes, but drag and
   * shuffle can overwrite it locally in between — exactly the "derive from
   * an input, then locally edit" shape a plain computed can't cover.
   */
  orderedMembers = linkedSignal(() => this.sortedByPosition(this.draft().draftMembers));

  isDirty = computed(() => this.orderedMembers().some((member, index) => member.pickPosition !== index + 1));

  /**
   * Mirrors the status allow-list `updatePickPositions()` enforces on the
   * backend. This is UX only — the backend check is the actual enforcement
   * and does not move with this one.
   */
  canEditOrder = computed(() => this.draft().status === DraftStatus.signup || this.draft().status === DraftStatus.locked);

  constructor() {
    effect(() => this.dirtyChange.emit(this.isDirty()));
  }

  drop(event: CdkDragDrop<DraftMember[]>): void {
    const members = [...this.orderedMembers()];
    moveItemInArray(members, event.previousIndex, event.currentIndex);
    this.orderedMembers.set(members);
  }

  shuffle(): void {
    const shuffled = [...this.orderedMembers()];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.orderedMembers.set(shuffled);
  }

  save(): void {
    const positions = this.orderedMembers().map((member, index) => ({ draftMemberId: member.id, pickPosition: index + 1 }));
    this.draftsStore.updateDraftMemberPositionsHttp({ draftId: this.draft().id, positions });
  }

  private sortedByPosition(members: DraftMember[]): DraftMember[] {
    return [...members].sort((a, b) => (a.pickPosition ?? Number.MAX_SAFE_INTEGER) - (b.pickPosition ?? Number.MAX_SAFE_INTEGER));
  }
}
