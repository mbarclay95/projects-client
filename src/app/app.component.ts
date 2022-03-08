import { Component } from '@angular/core';
import {faBullseye, faHome, faUsers} from "@fortawesome/free-solid-svg-icons";

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
}
