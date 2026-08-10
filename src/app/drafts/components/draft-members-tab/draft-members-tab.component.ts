import { Component, inject, Input, signal } from '@angular/core';
import { Draft } from '../../models/draft.model';
import { createDraftMember, DraftMember } from '../../models/draft-member.model';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-draft-members-tab',
  templateUrl: './draft-members-tab.component.html',
  styleUrls: ['./draft-members-tab.component.scss'],
  imports: [FaIconComponent, NzPopconfirmDirective, NzEmptyComponent, NzInputDirective, NzButtonComponent, FormsModule],
})
export class DraftMembersTabComponent {
  @Input({ required: true }) draft!: Draft;

  readonly draftsStore = inject(DraftsSignalStore);

  edit = faEdit;
  trash = faTrash;

  newMemberName = '';
  editingMemberId = signal<number | undefined>(undefined);
  editingName = '';

  addMember(): void {
    const name = this.newMemberName.trim();
    if (!name) {
      return;
    }
    this.draftsStore.createDraftMemberHttp({
      member: createDraftMember({ draftId: this.draft.id, name }),
      onSuccess: () => (this.newMemberName = ''),
    });
  }

  startEditing(member: DraftMember): void {
    this.editingMemberId.set(member.id);
    this.editingName = member.name;
  }

  commitEdit(member: DraftMember): void {
    const name = this.editingName.trim();
    if (name && name !== member.name) {
      this.draftsStore.updateDraftMemberHttp({ member: { ...member, name } });
    }
    this.editingMemberId.set(undefined);
  }

  deleteMember(member: DraftMember): void {
    this.draftsStore.deleteDraftMemberHttp({ member });
  }
}
