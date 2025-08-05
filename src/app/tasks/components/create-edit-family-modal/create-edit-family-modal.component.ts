import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';
import { createFamily, Family } from '../../models/family.model';
import { FamiliesService } from '../../services/families/state/families.service';
import { UsersQuery } from '../../../users/services/state/users.query';
import { faEdit, faSave } from '@fortawesome/free-solid-svg-icons';
import { FamiliesQuery } from '../../services/families/state/families.query';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-create-edit-family-modal',
  templateUrl: './create-edit-family-modal.component.html',
  styleUrls: ['./create-edit-family-modal.component.scss'],
  standalone: false,
})
export class CreateEditFamilyModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Family>;
  @Input() showFamilyMembers = false;

  family?: Family;
  isVisible: boolean = false;
  saving = false;
  save = faSave;
  edit = faEdit;
  modalStyle = isMobile ? { top: '20px' } : {};
  modalWidth = isMobile ? '95%' : '500px';
  listOfPoints: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private familiesService: FamiliesService,
    private familiesQuery: FamiliesQuery,
    public usersQuery: UsersQuery,
    private nzMessageService: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe((family) => {
      this.family = family.id === 0 ? family : createFamily(family);
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async saveFamily() {
    if (!this.family) {
      return;
    }
    this.saving = true;
    try {
      this.family.id === 0
        ? await this.familiesService.createNewFamily(this.family)
        : await this.familiesService.updateFamily(this.family.id, this.family);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error('There was an error saving the family.');
      return;
    }
    this.nzMessageService.success('Family Saved!');
    this.saving = false;
    this.isVisible = false;
  }

  updateFamilyMembers(userIds: number[]) {
    if (!this.family) {
      return;
    }
    this.family.members = this.usersQuery.getUsersByIds(userIds);
  }

  updateFamilyTaskPoints(taskPoints: number[]) {
    if (!this.family) {
      return;
    }
    this.family.taskPoints = [...taskPoints.sort((a, b) => a - b)];
  }
}
