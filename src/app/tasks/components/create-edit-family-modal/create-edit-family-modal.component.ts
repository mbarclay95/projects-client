import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {createFamily, Family} from "../../models/family.model";
import {FamiliesService} from "../../services/families/state/families.service";
import {User} from "../../../users/models/user.model";
import {UsersQuery} from "../../../users/services/state/users.query";

@Component({
  selector: 'app-create-edit-family-modal',
  templateUrl: './create-edit-family-modal.component.html',
  styleUrls: ['./create-edit-family-modal.component.scss']
})
export class CreateEditFamilyModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Family>;

  family!: Family;
  isVisible: boolean = false;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private familiesService: FamiliesService,
    public usersQuery: UsersQuery,
    private nzMessageService: NzMessageService
  ) {
  }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(family => {
      this.family = family.id === 0 ? family : createFamily(family);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveFamily() {
    this.saving = true;
    try {
      this.family.id === 0 ?
        await this.familiesService.createNewFamily(this.family) :
        await this.familiesService.updateFamily(this.family.id, this.family);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error("There was an error saving the family.");
      return;
    }
    this.nzMessageService.success('Family Saved!');
    this.saving = false;
    this.isVisible = false;
  }

  toId = (user: User): number => {
    return user.id;
  }

  updateFamilyMembers(userIds: number[]) {
    this.family.members = this.usersQuery.getUsersByIds(userIds);
  }
}
