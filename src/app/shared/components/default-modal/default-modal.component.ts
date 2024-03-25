import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, takeUntil} from 'rxjs';
import {isMobile} from '../../../app.component';

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})
export class DefaultModalComponent<T> implements OnInit, OnDestroy {
  @Input() openModal!: Observable<T>;

  model!: T;
  isVisible: boolean = false;
  saving = false;
  modalStyle = isMobile ? {top: '20px'} : {};
  modalWidth = isMobile ? '95%' : '500px';

  subscriptionDestroyer: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.openModal.pipe(
      takeUntil(this.subscriptionDestroyer)
    ).subscribe(model => {
      this.model = this.createModel(model);
      this.onOpenModal();
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  onOpenModal(): void {}

  createModel(model: T): T {
    return {...model};
  }

}
