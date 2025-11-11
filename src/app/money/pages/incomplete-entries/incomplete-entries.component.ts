import { Component, effect, inject } from '@angular/core';
import { EntriesSignalStore } from '../../services/entries-signal-store';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { EntryRowsComponent } from '../../components/entry-rows/entry-rows.component';
import { CreateEditEntryModalComponent } from '../../components/create-edit-entry-modal/create-edit-entry-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-incomplete-entries',
  templateUrl: './incomplete-entries.component.html',
  styleUrls: ['./incomplete-entries.component.scss'],
  imports: [NzSpinComponent, EntryRowsComponent, CreateEditEntryModalComponent, NzModalModule],
})
export class IncompleteEntriesComponent {
  readonly entriesStore = inject(EntriesSignalStore);

  constructor() {
    effect(() => {
      this.entriesStore.setQueryString(this.entriesStore.buildQueryString());
      this.entriesStore.loadAll({});
    });
  }
}
