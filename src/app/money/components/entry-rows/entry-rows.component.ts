import { Component, Input } from '@angular/core';
import { Entry } from '../../models/entry.model';
import { EntryRowItemComponent } from '../entry-row-item/entry-row-item.component';
import { NzEmptyComponent } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-entry-rows',
  templateUrl: './entry-rows.component.html',
  styleUrls: ['./entry-rows.component.scss'],
  imports: [EntryRowItemComponent, NzEmptyComponent],
})
export class EntryRowsComponent {
  @Input() entries: Entry[] = [];
}
