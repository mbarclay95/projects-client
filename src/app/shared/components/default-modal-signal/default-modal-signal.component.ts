import { Component, computed, effect, input } from '@angular/core';
import { isMobile } from '../../../app.component';

@Component({
  selector: 'app-default-modal-signal',
  imports: [],
  templateUrl: './default-modal-signal.component.html',
  styleUrl: './default-modal-signal.component.scss',
})
export class DefaultModalSignalComponent<T = boolean> {
  readonly openModal = input.required<T | undefined>();
  readonly isVisible = computed(() => !!this.openModal());

  model?: T;
  modalStyle = isMobile ? { top: '20px' } : {};
  modalWidth = isMobile ? '95%' : '500px';

  constructor() {
    effect(() => {
      this.model = this.openModal();
      if (this.model) {
        this.onOpenModal();
      } else {
        this.onCloseModal();
      }
    });
  }

  onOpenModal(): void {
    // override if needed
  }

  onCloseModal(): void {
    // override if needed
  }
}
