import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { faArrowsRotate, faChevronLeft, faEdit, faFile, faFolder, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DirectoryItem } from '../../models/directory-item.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WorkingDirectoryItem, workingDirectoryToString } from '../../models/working-directory-item';
import { DirectoryItemsSignalStore } from '../../services/directory-items-signal-store';

@Component({
  selector: 'app-directories-files-list',
  templateUrl: './directories-files-list.component.html',
  styleUrls: ['./directories-files-list.component.scss'],
  standalone: false,
})
export class DirectoriesFilesListComponent {
  @Input() workingDirectory: WorkingDirectoryItem[] = [];
  @Input() newLocationBeingSelected = false;
  @Output() openCreateEditModal: EventEmitter<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> = new EventEmitter<
    DirectoryItem & { createOrUpdate: 'Create' | 'Update' }
  >();
  @Output() cancelNewLocation: EventEmitter<void> = new EventEmitter<void>();
  @Output() selectNewLocation: EventEmitter<WorkingDirectoryItem[]> = new EventEmitter<WorkingDirectoryItem[]>();
  file = faFile;
  dir = faFolder;
  delete = faTrash;
  edit = faEdit;
  refresh = faArrowsRotate;
  back = faChevronLeft;

  readonly directoryItemsStore = inject(DirectoryItemsSignalStore);

  constructor(private nzMessageService: NzMessageService) {}

  clickedWorkingDirectory(dir: { sort: number; path: string }, last: boolean): void {
    if (last) {
      return;
    }
    this.directoryItemsStore.clickedWorkingDirectory(dir);
  }

  clickedRoot(noWorkingDir: boolean) {
    if (noWorkingDir) {
      return;
    }
    this.directoryItemsStore.clickedRoot();
  }

  goBack(): void {
    if (this.workingDirectory.length === 0) {
      return;
    }
    if (this.workingDirectory.length === 1) {
      this.directoryItemsStore.clickedRoot();
      return;
    }

    const index = this.workingDirectory.length - 2;
    this.directoryItemsStore.clickedWorkingDirectory(this.workingDirectory[index]);
  }

  updateItem(item: DirectoryItem): void {
    this.openCreateEditModal.emit({
      id: item.id,
      type: item.type,
      createOrUpdate: 'Update',
    });
  }

  async deleteItem(item: DirectoryItem): Promise<void> {
    this.directoryItemsStore.removeCustom({
      entity: {
        ...item,
        workingDirectory: workingDirectoryToString(this.workingDirectory),
      },
      onSuccess: () => {
        this.nzMessageService.success(`${item.type === 'dir' ? 'Directory' : 'File'} deleted`);
      },
    });
  }
}
