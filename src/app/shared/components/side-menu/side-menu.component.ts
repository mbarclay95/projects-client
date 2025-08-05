import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Route } from '../../models/routes.model';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  standalone: false,
})
export class SideMenuComponent implements OnInit {
  @Input() routes: Route[] = [];
  @Input() sideMenuClosed!: boolean;
  @Input() isMobile!: boolean;

  @Output() closeSideMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  closeIfMobile() {
    if (this.isMobile) {
      this.closeSideMenu.emit();
    }
  }
}
