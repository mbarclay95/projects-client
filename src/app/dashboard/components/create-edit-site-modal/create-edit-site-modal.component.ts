import { Component, inject } from '@angular/core';
import { Site } from '../../models/site.model';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { environment } from '../../../../environments/environment';
import { createSiteImage } from '../../models/site-image.model';
import { NzUploadChangeParam, NzUploadFile, NzUploadComponent } from 'ng-zorro-antd/upload';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzSelectComponent } from 'ng-zorro-antd/select';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-create-edit-site-modal',
  templateUrl: './create-edit-site-modal.component.html',
  styleUrls: ['./create-edit-site-modal.component.scss'],
  imports: [
    NzModalComponent,
    NzModalContentDirective,
    NzInputDirective,
    ReactiveFormsModule,
    FormsModule,
    NzSelectComponent,
    NzCheckboxComponent,
    NzUploadComponent,
  ],
})
export class CreateEditSiteModalComponent extends DefaultModalSignalComponent<Site> {
  fileList: NzUploadFile[] = [];
  check = faCheckCircle;
  folderId: number = 0;

  readonly folderStore = inject(FolderSignalStore);

  override onOpenModal(): void {
    if (!this.model) {
      return;
    }
    this.folderId = this.model.folderId;
  }

  saveSite(): void {
    if (!this.model) {
      return;
    }
    if (this.model.id === 0) {
      this.folderStore.createSiteHttp({ site: this.model, onSuccess: () => this.closeModal() });
    } else {
      this.folderStore.updateSiteHttp({ site: this.model, oldFolderId: this.folderId, onSuccess: () => this.closeModal() });
    }
  }

  closeModal(): void {
    this.fileList = [];
    this.folderStore.setSelectedSite();
  }

  getUploadPath(): string {
    return `${environment.apiUrl}/site-images`;
  }

  handleChange({ file }: NzUploadChangeParam): void {
    if (!this.model) {
      return;
    }
    const status = file.status;

    if (status === 'done') {
      this.model.siteImage = createSiteImage(file.response);
    }
  }
}
