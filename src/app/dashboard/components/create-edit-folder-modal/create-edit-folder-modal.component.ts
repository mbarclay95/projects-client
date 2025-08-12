import { Component, inject } from '@angular/core';
import { Folder } from '../../models/folder.model';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { DefaultModalSignalComponent } from '../../../shared/components/default-modal-signal/default-modal-signal.component';

@Component({
  selector: 'app-create-edit-folder-modal',
  templateUrl: './create-edit-folder-modal.component.html',
  styleUrls: ['./create-edit-folder-modal.component.scss'],
  standalone: false,
})
export class CreateEditFolderModalComponent extends DefaultModalSignalComponent<Folder> {
  readonly folderStore = inject(FolderSignalStore);

  saveFolder(): void {
    if (!this.model) {
      return;
    }
    if (this.model.id === 0) {
      this.folderStore.create({ entity: this.model, onSuccess: () => this.closeModal() });
    } else {
      this.folderStore.update({ entity: this.model, onSuccess: () => this.closeModal() });
    }
  }

  closeModal(): void {
    this.folderStore.setSelectedFolder();
  }
}
