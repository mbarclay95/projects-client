import {Component, OnInit} from '@angular/core';
import {MobileFooterService} from "../../../shared/services/mobile-footer.service";
import {AuthQuery} from "../../services/state/auth.query";
import {User} from "../../../users/models/user.model";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  user!: User;

  constructor(
    private mobileFooterService: MobileFooterService,
    public authQuery: AuthQuery,
  ) {
  }

  ngOnInit(): void {
    this.user = {...this.authQuery.getUser()};
    this.mobileFooterService.clearFooterButtons();
  }

}
