import { Component, computed, input } from '@angular/core';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-default-modal-signal',
  imports: [],
  templateUrl: './default-modal-signal.component.html',
  styleUrl: './default-modal-signal.component.scss',
})
export abstract class DefaultModalSignalComponent<T> {
  readonly openModal = input.required<T | undefined>();
  readonly isVisible = computed(() => {
    this.model = this.openModal();
    if (this.model) {
      this.onOpenModal();
      return true;
    }
    this.onCloseModal();
    return false;
  });

  model?: T;
  modalStyle = isMobile ? { top: '20px' } : {};
  modalWidth = isMobile ? '95%' : '500px';

  // override if needed
  onOpenModal(): void {}

  // override if needed
  onCloseModal(): void {}
}
