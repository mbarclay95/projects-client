import { Component, inject, output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draft-signup-modal',
  templateUrl: './draft-signup-modal.component.html',
  styleUrls: ['./draft-signup-modal.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, NzInputDirective, FormsModule],
})
export class DraftSignupModalComponent extends DefaultModalSignalComponent {
  private draftService = inject(DraftService);
  private draftCacheService = inject(DraftCacheService);
  private nzMessageService = inject(NzMessageService);

  closed = output<void>();

  saving = false;
  nameError = false;
  name = '';

  override onOpenModal(): void {
    this.name = '';
    this.nameError = false;
  }

  async claim() {
    this.nameError = false;
    if (this.name === '') {
      this.nameError = true;
      return;
    }

    this.saving = true;
    try {
      const member = await this.draftService.claimMember(this.name);
      this.draftCacheService.loadNewMemberIntoCache(this.draftService.getId(), member);
    } catch (_e) {
      // 422s here are almost always "that name is taken" or "this draft is full" —
      // both are things a stranger typing a name needs to see, not a generic error.
      this.nzMessageService.error('That name could not be claimed. It may already be taken, or the draft may be full.');
      this.saving = false;
      return;
    }

    this.nzMessageService.success('You are signed up!');
    this.saving = false;
    this.closed.emit();
  }
}
