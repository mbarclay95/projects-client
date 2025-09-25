import { Component, inject, Input } from '@angular/core';
import { Family } from '../../models/family.model';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FamiliesSignalStore } from '../../services/families-signal-store';

@Component({
  selector: 'app-my-family-edit-family',
  templateUrl: './my-family-edit-family.component.html',
  styleUrls: ['./my-family-edit-family.component.scss'],
  standalone: false,
})
export class MyFamilyEditFamilyComponent {
  @Input() myFamily!: Family;

  settings = faCog;

  readonly familiesStore = inject(FamiliesSignalStore);
}
