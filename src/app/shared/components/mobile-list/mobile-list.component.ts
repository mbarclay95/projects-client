import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-mobile-list',
  template: '<ng-content />',
  styleUrls: ['./mobile-list.component.scss'],
})
export class MobileListComponent {}

@Component({
  selector: 'app-mobile-list-row',
  templateUrl: './mobile-list-row.component.html',
  styleUrls: ['./mobile-list-row.component.scss'],
  host: { '(click)': 'rowClick.emit()' },
})
export class MobileListRowComponent {
  aside = input<string>();
  meta = input<string>();

  rowClick = output<void>();
}
