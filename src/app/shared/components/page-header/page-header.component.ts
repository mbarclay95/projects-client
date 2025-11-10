import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  imports: [NzButtonComponent],
})
export class PageHeaderComponent implements OnInit {
  @Input() buttonText?: string;
  @Input() title: string = '';

  @Output() createButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
