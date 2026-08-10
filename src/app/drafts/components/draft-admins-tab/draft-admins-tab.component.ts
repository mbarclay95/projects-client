import { Component, Input } from '@angular/core';
import { Draft } from '../../models/draft.model';

@Component({
  selector: 'app-draft-admins-tab',
  templateUrl: './draft-admins-tab.component.html',
  styleUrls: ['./draft-admins-tab.component.scss'],
  imports: [],
})
export class DraftAdminsTabComponent {
  @Input({ required: true }) draft!: Draft;
}
