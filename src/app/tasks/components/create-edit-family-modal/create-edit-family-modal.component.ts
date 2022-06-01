import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable, Subject, takeUntil} from "rxjs";
import {createTarget, Target} from "../../../backups/models/target.model";
import {TargetsService} from "../../../backups/services/targets/state/targets.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {createFamily, Family} from "../../models/family.model";
import {FamiliesService} from "../../services/families/state/families.service";

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
        await this.familiesService.updateFamily(this.family);
    } catch (e) {
      this.saving = false;
      this.nzMessageService.error("There was an error saving the family.");
      return;
    }
    this.nzMessageService.success('Family Saved!');
    this.saving = false;
    this.isVisible = false;
  }
}
