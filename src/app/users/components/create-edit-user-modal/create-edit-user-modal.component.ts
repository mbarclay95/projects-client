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

  updateUsersRoles(checked: boolean, roleId: number) {
    if (checked) {
      const role = this.rolesQuery.getEntity(roleId);
      if (role) {
        this.user.roles.push(role);
      }
    } else {
      this.user.roles = this.user.roles.filter(r => r.id !== roleId);
    }
  }

  async saveUser() {
    this.saving = true;
    try {
      this.user.id === 0 ?
        await this.usersService.createUser(this.user) :
        await this.usersService.updateUser(this.user.id, this.user);
    } catch (e) {
      this.saving = false;
      return;
    }
    this.saving = false;
    this.nzMessageService.success('User Saved!');
    this.isVisible = false;
  }
}
