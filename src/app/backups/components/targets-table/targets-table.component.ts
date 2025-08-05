import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Target } from '../../models/target.model';
import { faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-targets-table',
  templateUrl: './targets-table.component.html',
  styleUrls: ['./targets-table.component.scss'],
})
export class TargetsTableComponent implements OnInit {
  @ViewChild('targetsTableTag', { static: true }) targetsTable: NzTableComponent<Target> | undefined;
  @Input() set targets(targets: Target[] | null) {
    if (targets) {
      this._targets = targets;
    }
  }
  @Output() editTarget: EventEmitter<{ target: Target }> = new EventEmitter<{ target: Target }>();

  _targets: Target[] = [];
  edit = faEdit;

  constructor() {}

  ngOnInit(): void {}
}
