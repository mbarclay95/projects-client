import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  NzTableComponent,
  NzTheadComponent,
  NzTrDirective,
  NzTableCellDirective,
  NzThMeasureDirective,
  NzTbodyComponent,
} from 'ng-zorro-antd/table';
import { Target } from '../../models/target.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { NzButtonComponent } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
  imports: [
    NzTableComponent,
    NzTheadComponent,
    NzTrDirective,
    NzTableCellDirective,
    NzThMeasureDirective,
    NzTbodyComponent,
    NzButtonComponent,
    FaIconComponent,
  ],
})
export class TargetsTableComponent {
  @ViewChild('targetsTableTag', { static: true }) targetsTable: NzTableComponent<Target> | undefined;
  @Input() set targets(targets: Target[] | null) {
    if (targets) {
      this._targets = targets;
    }
  }
  @Output() editTarget: EventEmitter<number> = new EventEmitter<number>();

  _targets: Target[] = [];
  edit = faEdit;
}
