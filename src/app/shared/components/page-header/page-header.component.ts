import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  imports: [NzButtonComponent],
})
export class PageHeaderComponent {
  @Input() buttonText?: string;
  @Input() title = '';

  @Output() createButtonClicked: EventEmitter<void> = new EventEmitter<void>();
}
