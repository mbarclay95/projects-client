import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Draft, DraftStatus } from '../../models/draft.model';
import { DraftMember } from '../../models/draft-member.model';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { CdkDragDrop, CdkDragHandle, CdkDropList, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { faGripVertical, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-draft-order-tab',
  templateUrl: './draft-order-tab.component.html',
  styleUrls: ['./draft-order-tab.component.scss'],
  imports: [CdkDropList, CdkDragHandle, DragDropModule, FaIconComponent, NzButtonComponent, NzEmptyComponent],
})
export class DraftOrderTabComponent implements OnChanges {
  @Input({ required: true }) draft!: Draft;

  readonly draftsStore = inject(DraftsSignalStore);

  orderedMembers: DraftMember[] = [];
  grip = faGripVertical;
  shuffleIcon = faShuffle;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['draft']) {
      this.orderedMembers = this.sortedByPosition(this.draft.draftMembers);
    }
  }

  drop(event: CdkDragDrop<DraftMember[]>): void {
    moveItemInArray(this.orderedMembers, event.previousIndex, event.currentIndex);
  }

  shuffle(): void {
    const shuffled = [...this.orderedMembers];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    this.orderedMembers = shuffled;
  }

  /**
   * Mirrors the status allow-list `updatePickPositions()` enforces on the
   * backend. This is UX only — the backend check is the actual enforcement
   * and does not move with this one.
   */
  canEditOrder(): boolean {
    return this.draft.status === DraftStatus.signup || this.draft.status === DraftStatus.locked;
  }

  isDirty(): boolean {
    return this.orderedMembers.some((member, index) => member.pickPosition !== index + 1);
  }

  save(): void {
    const positions = this.orderedMembers.map((member, index) => ({ draftMemberId: member.id, pickPosition: index + 1 }));
    this.draftsStore.updateDraftMemberPositionsHttp({ draftId: this.draft.id, positions });
  }

  private sortedByPosition(members: DraftMember[]): DraftMember[] {
    return [...members].sort((a, b) => (a.pickPosition ?? Number.MAX_SAFE_INTEGER) - (b.pickPosition ?? Number.MAX_SAFE_INTEGER));
  }
}
