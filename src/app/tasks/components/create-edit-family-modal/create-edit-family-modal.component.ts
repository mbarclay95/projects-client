import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {NzMessageService} from "ng-zorro-antd/message";
import {createFamily, Family} from "../../models/family.model";
import {FamiliesService} from "../../services/families/state/families.service";
import {User} from "../../../users/models/user.model";
import {UsersQuery} from "../../../users/services/state/users.query";
import {faEdit, faMinus, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {createTaskPoint, TaskPoint} from "../../models/task-point.model";
import {FamiliesQuery} from "../../services/families/state/families.query";

@Component({
  selector: 'app-create-edit-family-modal',
  templateUrl: './create-edit-family-modal.component.html',
  styleUrls: ['./create-edit-family-modal.component.scss']
})
export class CreateEditFamilyModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<Family>;

  family?: Family;
  isVisible: boolean = false;
  saving = false;
  plus = faPlus;
  save = faSave;
  edit = faEdit;
  remove = faMinus;
  modalStyle = screen.width < 600 ? {top: '20px'} : {};
  modalWidth = screen.width < 600 ? '95%' : '500px';
  editTaskPointId: number | null = null;
  newTaskPoint: TaskPoint | null = null;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor(
    private familiesService: FamiliesService,
    private familiesQuery: FamiliesQuery,
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
      this.editTaskPointId = null;
      this.newTaskPoint = null;
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
    if (!this.family) {
      return;
    }
    this.family.members = this.usersQuery.getUsersByIds(userIds);
  }

  createNewTaskPoint(): void {
    this.newTaskPoint = createTaskPoint({});
  }

  async saveNewTaskPoint(): Promise<void> {
    if (!this.family) {
      return;
    }
    if (!this.newTaskPoint) {
      return;
    }
    try {
      await this.familiesService.saveTaskPoint(this.newTaskPoint, this.family.id);
    } catch (e) {
      this.nzMessageService.error("There was an error saving the task point.");
      return;
    }
    this.updateFamilyTaskPoints();
    this.newTaskPoint = null
  }

  async updateTaskPoint(taskPoint: TaskPoint): Promise<void> {
    if (!this.family) {
      return;
    }
    try {
      await this.familiesService.updateTaskPoint(taskPoint, this.family.id);
    } catch (e) {
      this.nzMessageService.error("There was an error removing the task point.");
      return;
    }
    this.editTaskPointId = null;
    this.updateFamilyTaskPoints();
  }

  async removeTaskPoint(taskPoint: TaskPoint): Promise<void> {
    if (!this.family) {
      return;
    }
    try {
      await this.familiesService.removeTaskPoint(taskPoint, this.family.id);
    } catch (e) {
      this.nzMessageService.error("There was an error removing the task point.");
      return;
    }
    this.updateFamilyTaskPoints();
  }

  updateFamilyTaskPoints() {
    if (!this.family) {
      return;
    }
    const family = this.familiesQuery.getEntity(this.family.id);
    if (family) {
      this.family.taskPoints = [...family.taskPoints].map(taskPoint => ({...taskPoint}));
    }
  }

}
