import { Component, OnInit } from '@angular/core';
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {FoldersQuery} from "../../services/folder/state/folders.query";
import {FoldersService} from "../../services/folder/state/folders.service";
import {UptimeKumaService} from '../../services/uptime-kuma.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  edit = faEdit;

  constructor(
    public foldersQuery: FoldersQuery,
    public foldersService: FoldersService,
    private uptimeKumaService: UptimeKumaService
  ) { }

  ngOnInit(): void {
    this.uptimeKumaService.initSocket();
  }

}
