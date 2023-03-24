import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable, Subject, takeUntil} from 'rxjs';
import {DirectoryItem} from '../../models/directory-item.model';
import {DirectoryItemsService} from '../../services/state/directory-items.service';
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-create-edit-directory-item-modal',
  templateUrl: './create-edit-directory-item-modal.component.html',
  styleUrls: ['./create-edit-directory-item-modal.component.scss']
})
export class CreateEditDirectoryItemModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }>;

  item?: DirectoryItem & { newName: string };
  createOrUpdate?: 'Create' | 'Update';
  isVisible: boolean = false;
  saving = false;
  modalWidth = isMobile ? '95%' : '650px';
  modalStyle = isMobile ? {top: '20px'} : {};

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private directoryItemsService: DirectoryItemsService,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(item => {
      this.item = {
        id: item.id,
        type: item.type,
        newName: item.id
      };
      this.createOrUpdate = item.createOrUpdate;
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveItem() {
    if (!this.item) {
      return;
    }
    this.saving = true;
    try {
      if (this.createOrUpdate === 'Create') {
        await this.directoryItemsService.createDirectory(this.item);
      } else {
        await this.directoryItemsService.updateItem(this.item);
      }
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
    }

    this.nzMessageService.success(`${this.item.type === 'dir' ? 'Directory' : 'File'} ${this.createOrUpdate}`);
    this.saving = false;
    this.isVisible = false;
  }
}
