import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Route} from "../../../auth/permissions";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() routes: Route[] = [];
  @Input() sideMenuClosed!: boolean;
  @Input() isMobile!: boolean;

  @Output() closeSideMenu: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  closeIfMobile() {
    if (this.isMobile) {
      this.closeSideMenu.emit();
    }
  }
}
