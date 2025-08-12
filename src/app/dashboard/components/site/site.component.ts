import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Site } from '../../models/site.model';
import { faEdit, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FolderSignalStore } from '../../services/folder-signal-store';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  standalone: false,
})
export class SiteComponent {
  @Input() site!: Site;
  @Input() editMode!: boolean;

  @Output() openSiteModal: EventEmitter<number> = new EventEmitter<number>();

  trash = faTrash;
  edit = faEdit;
  grip = faGripVertical;

  readonly folderStore = inject(FolderSignalStore);

  constructor(private nzMessageService: NzMessageService) {}

  updateSiteShow(show: boolean): void {
    const updatedSite = { ...this.site, ...{ show } };
    try {
      this.folderStore.updateSiteHttp({ site: updatedSite, oldFolderId: updatedSite.folderId });
    } catch (e) {
      this.nzMessageService.error('There was an error updating the site');
    }
  }
}
