import {Component, Input, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {createUser, User} from "../../models/user.model";
import {UsersService} from "../../services/state/users.service";
import {RolesQuery} from "../../services/roles/state/roles.query";
import {NzMessageService} from "ng-zorro-antd/message";

@Component({
  selector: 'app-create-edit-user-modal',
  templateUrl: './create-edit-user-modal.component.html',
  styleUrls: ['./create-edit-user-modal.component.scss']
})
export class CreateEditUserModalComponent implements OnInit {
  @Input() openModal!: Observable<User>;

  user!: User;
  isVisible: boolean = false;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private usersService: UsersService,
    public rolesQuery: RolesQuery,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe((user) => {
      this.user = user.id === 0 ? user : createUser(user);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  updateUsersRoles(event: number[]) {
    this.user.roles = this.rolesQuery.getRolesByIds(event);
  }

  async saveUser() {
    this.saving = true;
    try {
      await this.usersService.updateUser(this.user);
    } catch (e) {
      this.saving = false;
      return;
    }
    this.saving = false;
    this.nzMessageService.success('User Saved!');
    this.isVisible = false;
  }
}
