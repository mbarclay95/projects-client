import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Route } from '../../models/routes.model';
import { NzMenuDirective, NzMenuItemComponent } from 'ng-zorro-antd/menu';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  imports: [NzMenuDirective, NgClass, NzMenuItemComponent, RouterLink, FaIconComponent],
})
export class SideMenuComponent {
  @Input() routes: Route[] = [];
  @Input() sideMenuClosed!: boolean;
  @Input() isMobile!: boolean;

  @Output() closeSideMenu: EventEmitter<void> = new EventEmitter<void>();

  closeIfMobile() {
    if (this.isMobile) {
      this.closeSideMenu.emit();
    }
  }
}
