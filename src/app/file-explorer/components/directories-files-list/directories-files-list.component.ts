import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DirectoryItemsQuery } from '../../services/state/directory-items.query';
import { faArrowsRotate, faChevronLeft, faEdit, faFile, faFolder, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DirectoryItemsService } from '../../services/state/directory-items.service';
import { DirectoryItem } from '../../models/directory-item.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WorkingDirectoryItem, workingDirectoryToString } from '../../models/working-directory-item';

@Component({
  selector: 'app-directories-files-list',
  templateUrl: './directories-files-list.component.html',
  styleUrls: ['./directories-files-list.component.scss'],
  standalone: false,
})
export class DirectoriesFilesListComponent implements OnInit {
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

  constructor(
    public directoryItemsService: DirectoryItemsService,
    public directoryItemsQuery: DirectoryItemsQuery,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {}

  clickedDirectory(item: DirectoryItem): void {
    this.directoryItemsService.appendPath(item.id, this.workingDirectory);
  }

  clickedWorkingDirectory(dir: { sort: number; path: string }, last: boolean): void {
    if (last) {
      return;
    }
    this.directoryItemsService.clickedWorkingDirectory(dir, this.workingDirectory);
  }

  clickedRoot(noWorkingDir: boolean) {
    if (noWorkingDir) {
      return;
    }
    this.directoryItemsService.clickedRoot();
  }

  goBack(): void {
    if (this.workingDirectory.length === 0) {
      return;
    }
    if (this.workingDirectory.length === 1) {
      this.directoryItemsService.clickedRoot();
      return;
    }

    const index = this.workingDirectory.length - 2;
    this.directoryItemsService.clickedWorkingDirectory(this.workingDirectory[index], this.workingDirectory);
  }

  updateItem(item: DirectoryItem): void {
    this.openCreateEditModal.emit({
      id: item.id,
      type: item.type,
      createOrUpdate: 'Update',
    });
  }

  async deleteItem(item: DirectoryItem): Promise<void> {
    try {
      await this.directoryItemsService.deleteItem(item, this.workingDirectory);
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
    this.nzMessageService.success(`${item.type === 'dir' ? 'Directory' : 'File'} deleted`);
  }

  refreshDir(): void {
    void this.directoryItemsService.getItems(workingDirectoryToString(this.workingDirectory));
  }
}
