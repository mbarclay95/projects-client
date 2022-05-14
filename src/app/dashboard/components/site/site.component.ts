import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Site} from "../../models/site.model";
import {faEdit, faGripVertical, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FoldersService} from "../../services/folder/state/folders.service";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  @Input() site!: Site;
  @Input() editMode!: boolean;

  @Output() openSiteModal: EventEmitter<Site> = new EventEmitter<Site>();

  trash = faTrash;
  edit = faEdit;
  grip = faGripVertical;

  constructor(
    public foldersService: FoldersService
  ) { }

  ngOnInit(): void {
  }

}
