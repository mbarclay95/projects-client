import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Site } from '../../models/site.model';
import { faEdit, faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FolderSignalStore } from '../../services/folder-signal-store';
import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzSwitchComponent } from 'ng-zorro-antd/switch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss'],
  imports: [
    CdkDrag,
    NzButtonComponent,
    CdkDragHandle,
    FaIconComponent,
    NzSwitchComponent,
    ReactiveFormsModule,
    FormsModule,
    NzPopconfirmDirective,
  ],
})
export class SiteComponent {
  private nzMessageService = inject(NzMessageService);

  @Input() site!: Site;
  @Input() editMode!: boolean;

  @Output() openSiteModal: EventEmitter<number> = new EventEmitter<number>();

  trash = faTrash;
  edit = faEdit;
  grip = faGripVertical;

  readonly folderStore = inject(FolderSignalStore);

  updateSiteShow(show: boolean): void {
    const updatedSite = { ...this.site, ...{ show } };
    try {
      this.folderStore.updateSiteHttp({ site: updatedSite, oldFolderId: updatedSite.folderId });
    } catch (_e) {
      this.nzMessageService.error('There was an error updating the site');
    }
  }
}
