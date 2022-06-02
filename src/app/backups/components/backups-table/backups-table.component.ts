import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {Backup} from "../../models/backup.model";
import {faCheckCircle, faExclamationCircle, faPauseCircle, faSpinner} from "@fortawesome/free-solid-svg-icons";
import {SizeProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-backups-table',
  templateUrl: './backups-table.component.html',
  styleUrls: ['./backups-table.component.scss']
})
export class BackupsTableComponent implements OnInit {
  @ViewChild('backupsTableTag', {static: true}) backupsTable: NzTableComponent<Backup> | undefined;
  @Input() set backups(backups: Backup[] | null) {
    if (backups) {
      this._backups = backups;
    }
  }

  _backups: Backup[] = [];
  expandSet = new Set<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }

}
