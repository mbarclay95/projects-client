import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {createUser, User} from "../../models/user.model";
import {UsersService} from "../../services/state/users.service";
import {RolesQuery} from "../../services/roles/state/roles.query";
import {NzMessageService} from "ng-zorro-antd/message";
import {Role} from "../../models/role.model";
import {Roles} from "../../../auth/permissions";

@Component({
  selector: 'app-create-edit-user-modal',
  templateUrl: './create-edit-user-modal.component.html',
  styleUrls: ['./create-edit-user-modal.component.scss']
})
export class CreateEditUserModalComponent implements OnInit, OnDestroy {
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

  updateUsersRoles(checked: boolean, role: Role) {
    if (checked) {
      this.user.roles.push(role);
    } else {
      this.user.roles = this.user.roles.filter(r => r.id !== role.id);
    }

    if (!this.user.roles.find(r => r.name === this.user.userConfig.homePageRole)) {
      if (this.user.roles.length > 0) {
        this.updateUserHomePage(this.user.roles[0].name as Roles);
      }
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

  updateUserHomePage(roleName: Roles) {
    this.user.userConfig.homePageRole = roleName;
  }
}
