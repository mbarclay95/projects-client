import { Component, effect, Input, Signal } from '@angular/core';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-default-modal-signal',
  imports: [],
  templateUrl: './default-modal-signal.component.html',
  styleUrl: './default-modal-signal.component.scss',
})
export abstract class DefaultModalSignalComponent<T> {
  @Input() openModal!: Signal<T | undefined>;

  model?: T;
  isVisible: boolean = false;
  modalStyle = isMobile ? { top: '20px' } : {};
  modalWidth = isMobile ? '95%' : '500px';

  constructor() {
    effect(() => {
      this.model = this.openModal();
      if (this.model) {
        this.isVisible = true;
        this.onOpenModal();
      } else {
        this.isVisible = false;
        this.onCloseModal();
      }
    });
  }

  // override if needed
  onOpenModal(): void {}

  // override if needed
  onCloseModal(): void {}
}
