import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DirectoryItemsQuery} from '../../services/state/directory-items.query';
import {faEdit, faFile, faFolder, faTrash} from '@fortawesome/free-solid-svg-icons';
import {DirectoryItemsService} from '../../services/state/directory-items.service';
import {DirectoryItem} from '../../models/directory-item.model';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-directories-files-list',
  templateUrl: './directories-files-list.component.html',
  styleUrls: ['./directories-files-list.component.scss']
})
export class DirectoriesFilesListComponent implements OnInit {
  @Output() openCreateEditModal: EventEmitter<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }> =
    new EventEmitter<DirectoryItem & { createOrUpdate: "Create" | "Update" }>();
  file = faFile;
  dir = faFolder;
  delete = faTrash;
  edit = faEdit;

  constructor(
    public directoryItemsQuery: DirectoryItemsQuery,
    public directoryItemsService: DirectoryItemsService,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  clickedDirectory(item: DirectoryItem): void {
    this.directoryItemsService.appendPath(item.id);
    void this.directoryItemsService.getItems();
  }

  clickedWorkingDirectory(dir: { sort: number; path: string }, last: boolean): void {
    if (last) {
      return;
    }
    this.directoryItemsService.clickedWorkingDirectory(dir);
    void this.directoryItemsService.getItems();
  }

  clickedRoot(noWorkingDir: boolean) {
    if (noWorkingDir) {
      return;
    }
    this.directoryItemsService.clickedRoot();
    void this.directoryItemsService.getItems();
  }

  updateItem(item: DirectoryItem): void {
    this.openCreateEditModal.emit({
      id: item.id,
      type: item.type,
      createOrUpdate: 'Update'
    });
  }

  async deleteItem(item: DirectoryItem): Promise<void> {
    try {
      await this.directoryItemsService.deleteItem(item);
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
    this.nzMessageService.success(`${item.type === 'dir' ? 'Directory' : 'File'} deleted`)

  }
}
