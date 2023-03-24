import {Component, OnInit} from '@angular/core';
import {AuthQuery} from "../../services/state/auth.query";
import {Subject} from 'rxjs';
import {AuthService} from '../../services/state/auth.service';
import {User} from '../../../users/models/user.model';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  changePasswordModal: Subject<void> = new Subject<void>();

  constructor(
    public authQuery: AuthQuery,
    private authService: AuthService,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
  }

  async updateMe(changes: Partial<User>): Promise<void> {
    try {
      await this.authService.updateMe(changes);
      // this.nzMessageService
    } catch (e) {
      this.nzMessageService.error('There was an error');
    }
  }

}
