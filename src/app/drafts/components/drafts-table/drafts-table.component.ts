import { Component, EventEmitter, Input, Output, ViewChild, inject } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { faBoxArchive, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Draft, DRAFT_STATUS_COLORS, DRAFT_STATUS_LABELS } from '../../models/draft.model';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzPopconfirmDirective } from 'ng-zorro-antd/popconfirm';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drafts-table',
  templateUrl: './drafts-table.component.html',
  styleUrls: ['./drafts-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    FaIconComponent,
    NzPopconfirmDirective,
    NzTagComponent,
    DatePipe,
  ],
})
export class DraftsTableComponent {
  private router = inject(Router);

  @ViewChild('draftsTableTag', { static: true }) draftsTable: NzTableComponent<Draft> | undefined;

  @Input() drafts: Draft[] = [];
  @Input() loading!: boolean;

  @Output() editDraft: EventEmitter<number> = new EventEmitter<number>();
  @Output() archiveDraft: EventEmitter<number> = new EventEmitter<number>();

  edit = faEdit;
  archive = faBoxArchive;

  statusLabels = DRAFT_STATUS_LABELS;
  statusColors = DRAFT_STATUS_COLORS;

  openDraft(draftId: number): void {
    this.router.navigate(['/app/drafts', draftId]);
  }
}
