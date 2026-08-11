import { Component, Input, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { Draft, DraftStatus } from '../../models/draft.model';
import { DraftMember } from '../../models/draft-member.model';
import { DraftCacheService } from '../../services/draft-cache.service';

@Component({
  selector: 'app-draft-order',
  templateUrl: './draft-order.component.html',
  styleUrls: ['./draft-order.component.scss'],
  imports: [NzEmptyComponent, AsyncPipe],
})
export class DraftOrderComponent {
  draftCacheService = inject(DraftCacheService);

  private _draft!: Draft;

  sortedMembers: DraftMember[] = [];

  @Input({ required: true })
  set draft(draft: Draft) {
    this._draft = draft;
    this.sortedMembers =
      draft.status === DraftStatus.signup
        ? [...draft.draftMembers].sort((a, b) => a.id - b.id)
        : [...draft.draftMembers].sort((a, b) => (a.pickPosition ?? Number.MAX_SAFE_INTEGER) - (b.pickPosition ?? Number.MAX_SAFE_INTEGER));
  }

  get draft(): Draft {
    return this._draft;
  }

  get isSignup(): boolean {
    return this._draft.status === DraftStatus.signup;
  }
}
