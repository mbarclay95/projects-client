import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
  standalone: false,
})
export class PageHeaderComponent implements OnInit {
  @Input() buttonText?: string;
  @Input() title: string = '';

  @Output() createButtonClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}
}
