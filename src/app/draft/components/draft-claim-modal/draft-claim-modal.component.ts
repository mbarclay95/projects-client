import { Component, computed, inject, input, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzRadioGroupComponent, NzRadioComponent } from 'ng-zorro-antd/radio';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { Draft } from '../../models/draft.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';

@Component({
  selector: 'app-draft-claim-modal',
  templateUrl: './draft-claim-modal.component.html',
  styleUrls: ['./draft-claim-modal.component.scss'],
  imports: [AsyncPipe, FormsModule, NzModalComponent, NzModalContentDirective, NzRadioGroupComponent, NzRadioComponent],
})
export class DraftClaimModalComponent extends DefaultModalSignalComponent {
  private draftService = inject(DraftService);
  draftCacheService = inject(DraftCacheService);
  private nzMessageService = inject(NzMessageService);

  draft = input.required<Draft>();

  closed = output<void>();

  unclaimedMembers = computed(() => this.draft().draftMembers.filter((m) => !m.claimed));

  saving = false;
  selectionError = false;
  selectedMemberId?: number;

  override onOpenModal(): void {
    this.selectedMemberId = undefined;
    this.selectionError = false;
  }

  async claim(): Promise<void> {
    this.selectionError = false;
    if (!this.selectedMemberId) {
      this.selectionError = true;
      return;
    }

    this.saving = true;
    try {
      const member = await this.draftService.claimExistingMember(this.selectedMemberId);
      this.draftCacheService.setMemberInCache(this.draftService.getId(), member);
    } catch (_e) {
      // 422s here are "already claimed" (someone else got there first) or
      // "this draft is finished" — refresh so the list stops showing a row
      // that just became unavailable.
      this.nzMessageService.error('That name could not be claimed. It may have just been taken, or the draft may have finished.');
      await this.draftService.refreshDraft();
      this.saving = false;
      return;
    }

    this.nzMessageService.success("You're in!");
    this.saving = false;
    this.closed.emit();
  }
}
