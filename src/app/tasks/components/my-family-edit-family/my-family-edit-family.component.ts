import { Component, inject, Input } from '@angular/core';
import { Family } from '../../models/family.model';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FamiliesSignalStore } from '../../services/families-signal-store';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { CreateEditFamilyModalComponent } from '../create-edit-family-modal/create-edit-family-modal.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-my-family-edit-family',
  templateUrl: './my-family-edit-family.component.html',
  styleUrls: ['./my-family-edit-family.component.scss'],
  imports: [FaIconComponent, NzDividerComponent, CreateEditFamilyModalComponent, DecimalPipe],
})
export class MyFamilyEditFamilyComponent {
  @Input() myFamily!: Family;

  settings = faCog;

  readonly familiesStore = inject(FamiliesSignalStore);
}
