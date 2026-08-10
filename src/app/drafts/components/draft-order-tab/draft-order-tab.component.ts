import { Component, Input } from '@angular/core';
import { Draft } from '../../models/draft.model';

@Component({
  selector: 'app-draft-order-tab',
  templateUrl: './draft-order-tab.component.html',
  styleUrls: ['./draft-order-tab.component.scss'],
  imports: [],
})
export class DraftOrderTabComponent {
  @Input({ required: true }) draft!: Draft;
}
