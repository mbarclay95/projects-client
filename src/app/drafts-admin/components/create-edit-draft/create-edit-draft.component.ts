import { Component, inject } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Draft } from '../../models/draft.model';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { DraftsSignalStore } from '../../services/drafts-signal-store';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzUploadChangeParam, NzUploadComponent, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { environment } from '../../../../environments/environment';
import { createDraftImage } from '../../models/draft-image.model';

@Component({
  selector: 'app-create-edit-draft',
  templateUrl: './create-edit-draft.component.html',
  styleUrls: ['./create-edit-draft.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzDatePickerComponent,
    NzSwitchComponent,
    NzInputNumberComponent,
    NzUploadComponent,
    NzButtonComponent,
  ],
})
export class CreateEditDraftComponent extends DefaultModalSignalComponent<Draft> {
  readonly draftsStore = inject(DraftsSignalStore);
  readonly nzMessageService = inject(NzMessageService);

  fileList: NzUploadFile[] = [];

  override onOpenModal(): void {
    this.fileList = [];
  }

  /**
   * No draft id in the path, unlike draft-team-images: the image is uploaded
   * on its own and attached by id on save, so this works during a create too.
   */
  uploadPath(): string {
    return `${environment.apiUrl}/draft-images`;
  }

  handleChange({ file }: NzUploadChangeParam): void {
    if (!this.model || file.status !== 'done') {
      return;
    }
    this.model.draftImage = createDraftImage(file.response);
    this.model.draftImageId = this.model.draftImage.id;
  }

  removeImage(): void {
    if (!this.model) {
      return;
    }
    this.fileList = [];
    this.model.draftImage = null;
    this.model.draftImageId = null;
  }

  saveDraft(): void {
    if (!this.model) {
      return;
    }
    this.draftsStore.upsert({ entity: this.model, onSuccess: () => this.draftSaved() });
  }

  draftSaved(): void {
    this.nzMessageService.success('Draft Saved!');
    this.draftsStore.clearCreateEditEntity();
  }

  updateMaxParticipantsSwitch(checked: boolean): void {
    if (!this.model) {
      return;
    }
    this.model.maxParticipants = checked ? (this.model.maxParticipants ?? 0) : undefined;
  }
}
