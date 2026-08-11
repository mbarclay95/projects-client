import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DraftService } from '../../services/draft.service';
import { DraftCacheService } from '../../services/draft-cache.service';
import { isMobile } from '../../../app.component';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draft-signup-modal',
  templateUrl: './draft-signup-modal.component.html',
  styleUrls: ['./draft-signup-modal.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, NzInputDirective, FormsModule],
})
export class DraftSignupModalComponent implements OnInit, OnDestroy {
  private draftService = inject(DraftService);
  private draftCacheService = inject(DraftCacheService);
  private nzMessageService = inject(NzMessageService);

  @Input() openModal!: Observable<void>;

  isVisible = false;
  saving = false;
  nameError = false;
  name = '';
  modalWidth = isMobile ? '95%' : '500px';
  modalStyle = isMobile ? { top: '20px' } : {};

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe(() => {
      this.name = '';
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
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
    this.isVisible = false;
  }
}
