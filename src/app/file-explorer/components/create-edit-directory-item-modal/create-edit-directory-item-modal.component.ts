import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable, Subject, takeUntil} from 'rxjs';
import {DirectoryItem} from '../../models/directory-item.model';
import {DirectoryItemsService} from '../../services/state/directory-items.service';
import {isMobile} from '../../../app.component';
import {WorkingDirectoryItem, workingDirectoryToString} from '../../models/working-directory-item';

@Component({
  selector: 'app-create-edit-directory-item-modal',
  templateUrl: './create-edit-directory-item-modal.component.html',
  styleUrls: ['./create-edit-directory-item-modal.component.scss']
})
export class CreateEditDirectoryItemModalComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() openModal!: Observable<DirectoryItem & { createOrUpdate: 'Create' | 'Update' }>;
  @Input() newLocationSelected!: Observable<WorkingDirectoryItem[] | undefined>;
  @Input() workingDirectory: WorkingDirectoryItem[] = [];
  @Output() selectNewLocation: EventEmitter<WorkingDirectoryItem[]> = new EventEmitter<WorkingDirectoryItem[]>();
  @ViewChild('directoryName') directoryName!: ElementRef;

  modalWidth = isMobile ? '95%' : '650px';
  modalStyle = isMobile ? {top: '20px'} : {};
  item?: DirectoryItem;
  createOrUpdate?: 'Create' | 'Update';
  isVisible: boolean = false;
  saving = false;

  newName: string = '';
  newLocationMode: 'cp' | 'mv' = 'mv';
  newWorkingDirectory?: WorkingDirectoryItem[];

  private subscriptionDestroyer: Subject<void> = new Subject<void>();
  protected readonly workingDirectoryToString = workingDirectoryToString;

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
      };
      this.newWorkingDirectory = undefined;
      this.newName = item.id;
      this.createOrUpdate = item.createOrUpdate;
      this.isVisible = true;
    });

    this.newLocationSelected.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(newWorkingDirectory => {
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
    console.log('here');
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveItem() {
    if (!this.item || !this.newName || this.newName === '') {
      return;
    }
    this.saving = true;
    try {
      if (this.createOrUpdate === 'Create') {
        await this.directoryItemsService.createDirectory(this.item, this.newName, this.workingDirectory);
      } else {
        const newPath = `${workingDirectoryToString(this.newWorkingDirectory ?? this.workingDirectory)}/${this.newName}`;
        await this.directoryItemsService.updateItem(this.item, this.workingDirectory, newPath);
      }
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      this.saving = false;
      return;
    }

    this.nzMessageService.success(`${this.item.type === 'dir' ? 'Directory' : 'File'} ${this.createOrUpdate}`);
    this.saving = false;
    this.isVisible = false;
  }

  selectNewLocationClicked(): void {
    this.isVisible = false;
    this.selectNewLocation.emit(this.workingDirectory);
  }
}
