import { Component, Input } from '@angular/core';
import { Entry } from '../../models/entry.model';

@Component({
  selector: 'app-entry-rows',
  templateUrl: './entry-rows.component.html',
  styleUrls: ['./entry-rows.component.scss'],
  standalone: false,
})
export class EntryRowsComponent {
  @Input() entries: Entry[] = [];
}
