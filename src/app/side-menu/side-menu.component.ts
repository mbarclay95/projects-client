import {Component, Input, OnInit} from '@angular/core';
import {Route} from "../auth/permissions";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input() routes: Route[] = [];
  @Input() sideMenuClosed!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
