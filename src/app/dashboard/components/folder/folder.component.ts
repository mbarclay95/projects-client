import { Component, computed, EventEmitter, inject, Input, Output } from '@angular/core';
import { Folder } from '../../models/folder.model';
import { Site } from '../../models/site.model';
import { faChevronLeft, faChevronRight, faEdit, faEllipsisV, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { CdkDropList } from '@angular/cdk/drag-drop';
import { SiteComponent } from '../site/site.component';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss'],
  imports: [NzButtonComponent, FaIconComponent, NzTooltipDirective, NzPopconfirmDirective, CdkDropList, SiteComponent],
})
export class FolderComponent {
  @Input() folder!: Folder;
  @Input() editMode!: boolean;

  @Output() openSiteModal: EventEmitter<number> = new EventEmitter<number>();
  @Output() openFolderModal: EventEmitter<number> = new EventEmitter<number>();

  more = faEllipsisV;
  add = faPlus;
  trash = faTrash;
  edit = faEdit;
  left = faChevronLeft;
  right = faChevronRight;

  readonly folderStore = inject(FolderSignalStore);

  sortedSites = computed(() => {
    const editMode = this.folderStore.editMode();
    return this.folder.sites.filter((s) => (editMode ? true : s.show)).sort((a, b) => (a.sort ?? 1000) - (b.sort ?? 1000));
  });

  addNewSite(): void {
    this.folderStore.setFolderIdForNewSite(this.folder.id);
  }

  deleteFolder(): void {
    this.folderStore.remove({ id: this.folder.id });
    this.folderStore.loadAll({}); // load again so that sorts will be in correct order
  }

  dropSite({ event }: { event: any }): void {
    const oldPosition = event.previousIndex + 1;
    const newPosition = event.currentIndex + 1;
    if (oldPosition === newPosition) {
      return;
    }

    const movedSites: { id: number; sort: number }[] = [];
    const movedDown: boolean = oldPosition - newPosition > 0;

    this.folder.sites
      .filter((s): s is Site & { sort: number } => {
        if (!s.sort) {
          return false;
        }
        if (movedDown) {
          return s.sort <= oldPosition && s.sort >= newPosition;
        } else {
          return s.sort >= oldPosition && s.sort <= newPosition;
        }
      })
      .forEach((s) => {
        if (s.sort === oldPosition) {
          movedSites.push({ id: s.id, sort: newPosition });
          this.folderStore.updateSiteCache(this.folder.id, s.id, { sort: newPosition });
        } else {
          movedSites.push({ id: s.id, sort: s.sort + (movedDown ? 1 : -1) });
          this.folderStore.updateSiteCache(this.folder.id, s.id, { sort: s.sort + (movedDown ? 1 : -1) });
        }
      });

    this.folderStore.updateSiteSortHttp({
      folderId: this.folder.id,
      movedSites,
    });
  }
}
