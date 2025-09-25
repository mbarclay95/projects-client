import { Component, inject } from '@angular/core';
import { isMobile } from '../../../app.component';
import { UsersSignalStore } from '../../../users/services/users-signal-store';
import { FamiliesSignalStore } from '../../services/families-signal-store';

@Component({
  selector: 'app-families-page',
  templateUrl: './families-page.component.html',
  styleUrls: ['./families-page.component.scss'],
  standalone: false,
})
export class FamiliesPageComponent {
  isMobile = isMobile;

  readonly usersStore = inject(UsersSignalStore);
  readonly familiesStore = inject(FamiliesSignalStore);
}
