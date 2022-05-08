import { Component } from '@angular/core';
import {faBullseye, faHome, faUpload, faUsers} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projects-client';
  home = faHome;
  goals = faBullseye;
  users = faUsers;
  upload = faUpload;
}
