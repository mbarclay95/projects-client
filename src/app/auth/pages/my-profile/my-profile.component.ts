import {Component, OnInit} from '@angular/core';
import {AuthQuery} from "../../services/state/auth.query";
import {Subject} from 'rxjs';
import {AuthService} from '../../services/state/auth.service';
import {User} from '../../../users/models/user.model';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  loggingOut = false;
  changePasswordModal: Subject<void> = new Subject<void>();

  constructor(
    public authQuery: AuthQuery,
    private authService: AuthService,
    private nzMessageService: NzMessageService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  async updateMe(changes: Partial<User>): Promise<void> {
    try {
      await this.authService.updateMe(changes);
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
  }

  async logout(): Promise<void> {
    this.loggingOut = true;
    try {
      await this.authService.logout();
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error logging out');
      this.loggingOut = false;
      return;
    }

    this.nzMessageService.success('You have been logged out');
    this.loggingOut = false;
    await this.router.navigateByUrl('/login');
  }
}
