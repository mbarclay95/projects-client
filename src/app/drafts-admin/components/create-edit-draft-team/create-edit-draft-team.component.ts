import { Component, inject } from '@angular/core';
import { createDraftTeam, DraftTeam } from '../../models/draft-team.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzUploadChangeParam, NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-create-edit-draft-team',
  templateUrl: './create-edit-draft-team.component.html',
  styleUrls: ['./create-edit-draft-team.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, NzInputDirective, ReactiveFormsModule, FormsModule, NzUploadComponent],
})
export class CreateEditDraftTeamComponent extends DefaultModalSignalComponent<DraftTeam> {
  readonly draftsStore = inject(DraftsSignalStore);

  fileList: NzUploadFile[] = [];

  override onOpenModal(): void {
    this.fileList = [];
  }

  saveTeam(): void {
    if (!this.model) {
      return;
    }
    if (this.model.id === 0) {
      this.draftsStore.createDraftTeamHttp({ team: this.model, onSuccess: () => this.closeModal() });
    } else {
      this.draftsStore.updateDraftTeamHttp({ team: this.model, onSuccess: () => this.closeModal() });
    }
  }

  closeModal(): void {
    this.fileList = [];
    this.draftsStore.setSelectedTeam();
  }

  uploadPath(): string {
    return `${environment.apiUrl}/draft-team-images/${this.model?.id}`;
  }

  handleChange({ file }: NzUploadChangeParam): void {
    if (!this.model || file.status !== 'done') {
      return;
    }
    const updated = createDraftTeam(file.response);
    this.model = updated;
    this.draftsStore.patchDraftTeamCache(updated);
  }
}
