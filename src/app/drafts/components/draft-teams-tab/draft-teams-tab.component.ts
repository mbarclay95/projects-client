import { Component, Input } from '@angular/core';
import { Draft } from '../../models/draft.model';

@Component({
  selector: 'app-draft-teams-tab',
  templateUrl: './draft-teams-tab.component.html',
  styleUrls: ['./draft-teams-tab.component.scss'],
  imports: [],
})
export class DraftTeamsTabComponent {
  @Input({ required: true }) draft!: Draft;
}
