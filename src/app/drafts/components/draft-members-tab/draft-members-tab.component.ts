import { Component, Input } from '@angular/core';
import { Draft } from '../../models/draft.model';

@Component({
  selector: 'app-draft-members-tab',
  templateUrl: './draft-members-tab.component.html',
  styleUrls: ['./draft-members-tab.component.scss'],
  imports: [],
})
export class DraftMembersTabComponent {
  @Input({ required: true }) draft!: Draft;
}
