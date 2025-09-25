import { AfterViewChecked, Component, ElementRef, EventEmitter, inject, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subject, takeUntil } from 'rxjs';
import { DirectoryItem } from '../../models/directory-item.model';
import { isMobile } from '../../../app.component';
import { WorkingDirectoryItem, workingDirectoryToString } from '../../models/working-directory-item';
import { DirectoryItemsSignalStore } from '../../services/directory-items-signal-store';

@Component({
  selector: 'app-create-edit-directory-item-modal',
  templateUrl: './create-edit-directory-item-modal.component.html',
  styleUrls: ['./create-edit-directory-item-modal.component.scss'],
  standalone: false,
})
export class CreateEditDirectoryItemModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() openModal!: Observable<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }>;
  @Input() newLocationSelected!: Observable<WorkingDirectoryItem[] | undefined>;
  @Input() workingDirectory: WorkingDirectoryItem[] = [];
  @Output() selectNewLocation: EventEmitter<WorkingDirectoryItem[]> = new EventEmitter<WorkingDirectoryItem[]>();
  @ViewChild('directoryName') directoryName!: ElementRef;

  modalWidth = isMobile ? '95%' : '650px';
  modalStyle = isMobile ? { top: '20px' } : {};
  item?: DirectoryItem;
  createOrUpdate?: 'Create' | 'Update';
  isVisible: boolean = false;
  saving = false;

  newName: string = '';
  newLocationMode: 'cp' | 'mv' = 'mv';
  newWorkingDirectory?: WorkingDirectoryItem[];

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  protected readonly workingDirectoryToString = workingDirectoryToString;
  readonly directoryItemsStore = inject(DirectoryItemsSignalStore);

  constructor(private nzMessageService: NzMessageService) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((item) => {
      this.item = {
        id: item.id,
        type: item.type,
      };
      this.newWorkingDirectory = undefined;
      this.newName = item.id;
      this.createOrUpdate = item.createOrUpdate;
      this.isVisible = true;
    });

    this.newLocationSelected.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((newWorkingDirectory) => {
      this.newWorkingDirectory = newWorkingDirectory;
      this.isVisible = true;
    });
  }

  ngAfterViewChecked() {
    if (this.directoryName) {
      this.directoryName.nativeElement.focus();
    }
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveItem() {
    if (!this.item || !this.newName || this.newName === '') {
      return;
    }
    this.saving = true;
    if (this.createOrUpdate === 'Create') {
      this.directoryItemsStore.createCustom({
        entity: {
          type: this.item.type,
          newName: this.newName,
          workingDirectory: workingDirectoryToString(this.workingDirectory),
        },
        onSuccess: () => this.itemSaved(),
      });
    } else {
      const newPath = `${workingDirectoryToString(this.newWorkingDirectory ?? this.workingDirectory)}/${this.newName}`;
      this.directoryItemsStore.updateCustom({
        entity: {
          ...this.item,
          workingDirectory: workingDirectoryToString(this.workingDirectory),
          newPath,
          mode: 'mv',
        },
        onSuccess: () => this.itemSaved(),
      });
    }
  }

  itemSaved(): void {
    this.nzMessageService.success(`${this.item!.type === 'dir' ? 'Directory' : 'File'} ${this.createOrUpdate}`);
    this.saving = false;
    this.isVisible = false;
  }

  selectNewLocationClicked(): void {
    this.isVisible = false;
    this.selectNewLocation.emit(this.workingDirectory);
  }
}
