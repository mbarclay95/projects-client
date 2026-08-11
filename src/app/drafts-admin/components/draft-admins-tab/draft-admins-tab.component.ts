import { Component, inject, input, OnInit } from '@angular/core';
import { Draft } from '../../models/draft.model';
import { DraftAdmin } from '../../models/draft-admin.model';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzSelectComponent, NzOptionComponent } from 'ng-zorro-antd/select';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draft-admins-tab',
  templateUrl: './draft-admins-tab.component.html',
  styleUrls: ['./draft-admins-tab.component.scss'],
  imports: [FaIconComponent, NzPopconfirmDirective, NzTagComponent, NzSelectComponent, NzOptionComponent, NzButtonComponent, FormsModule],
})
export class DraftAdminsTabComponent implements OnInit {
  draft = input.required<Draft>();

  readonly draftsStore = inject(DraftsSignalStore);

  trash = faTrash;
  newAdminUserId: number | undefined;

  ngOnInit(): void {
    this.draftsStore.loadDraftAdminCandidatesHttp();
  }

  candidateName(userId: number): string {
    return this.draftsStore.draftAdminCandidates().find((candidate) => candidate.id === userId)?.name ?? `User #${userId}`;
  }

  addableCandidates() {
    const adminUserIds = this.draft().draftAdmins.map((admin) => admin.userId);
    return this.draftsStore.draftAdminCandidates().filter((candidate) => !adminUserIds.includes(candidate.id));
  }

  addAdmin(): void {
    if (!this.newAdminUserId) {
      return;
    }
    this.draftsStore.createDraftAdminHttp({
      draftId: this.draft().id,
      userId: this.newAdminUserId,
      onSuccess: () => (this.newAdminUserId = undefined),
    });
  }

  removeAdmin(admin: DraftAdmin): void {
    this.draftsStore.deleteDraftAdminHttp({ admin });
  }
}
