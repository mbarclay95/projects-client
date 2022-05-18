import {Component, OnInit} from '@angular/core';
import {BackupsQuery} from "../../services/backups/state/backups.query";

@Component({
  selector: 'app-backups-page',
  templateUrl: './backups-page.component.html',
  styleUrls: ['./backups-page.component.scss']
})
export class BackupsPageComponent implements OnInit {

  constructor(
    public backupsQuery: BackupsQuery
  ) { }

  ngOnInit(): void {
  }

}
