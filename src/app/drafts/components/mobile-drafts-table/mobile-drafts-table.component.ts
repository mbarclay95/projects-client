import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Draft, DraftStatus } from '../../models/draft.model';
import { faBoxArchive, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-drafts-table',
  templateUrl: './mobile-drafts-table.component.html',
  styleUrls: ['./mobile-drafts-table.component.scss'],
  imports: [NzSpinComponent, FaIconComponent, NzPopconfirmDirective, NzTagComponent, NzEmptyComponent, DatePipe],
})
export class MobileDraftsTableComponent {
  private router = inject(Router);

  @Input() drafts: Draft[] = [];
  @Input() loading!: boolean;

  @Output() editDraft: EventEmitter<number> = new EventEmitter<number>();
  @Output() archiveDraft: EventEmitter<number> = new EventEmitter<number>();

  edit = faEdit;
  archive = faBoxArchive;

  statusLabels: Record<DraftStatus, string> = {
    [DraftStatus.signup]: 'Signup',
    [DraftStatus.locked]: 'Locked',
    [DraftStatus.inProgress]: 'In Progress',
    [DraftStatus.complete]: 'Complete',
  };

  statusColors: Record<DraftStatus, string> = {
    [DraftStatus.signup]: 'blue',
    [DraftStatus.locked]: 'orange',
    [DraftStatus.inProgress]: 'processing',
    [DraftStatus.complete]: 'green',
  };

  openDraft(draftId: number): void {
    this.router.navigate(['/app/drafts', draftId]);
  }
}
