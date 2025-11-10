import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { isMobile } from '../../../app.component';
import { Observable, Subject, takeUntil } from 'rxjs';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthSignalStore } from '../../services/auth-signal-store';
import { NzModalComponent, NzModalContentDirective } from 'ng-zorro-antd/modal';
import { NzInputDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  imports: [NzModalComponent, NzModalContentDirective, ReactiveFormsModule, NzInputDirective],
})
export class ChangePasswordModalComponent implements OnInit, OnDestroy {
  @Input() openModal!: Observable<void>;

  isVisible = false;
  modalWidth = isMobile ? '95%' : '500px';
  modalStyle = isMobile ? { top: '20px' } : {};
  form?: FormGroup;
  saving = false;

  private subscriptionDestroyer: Subject<void> = new Subject<void>();

  readonly authStore = inject(AuthSignalStore);

  constructor(private nzMessageService: NzMessageService) {}

  ngOnInit(): void {
    this.openModal.pipe(takeUntil(this.subscriptionDestroyer)).subscribe(() => {
      this.form = new FormGroup(
        {
          currentPassword: new FormControl('', [Validators.required]),
          newPassword: new FormControl('', [Validators.required]),
          confirmPassword: new FormControl('', [Validators.required]),
        },
        [passwordsMatchValidator],
      );
      this.isVisible = true;
    });
  }

  ngOnDestroy(): void {
    this.subscriptionDestroyer.next();
    this.subscriptionDestroyer.complete();
  }

  async savePassword(): Promise<void> {
    if (!this.form) {
      return;
    }
    const currentPassword = (this.form.get('currentPassword')?.value as string | null) ?? '';
    const newPassword = (this.form.get('newPassword')?.value as string | null) ?? '';
    this.saving = true;
    try {
      await this.authStore.changePassword(currentPassword, newPassword);
    } catch (e) {
      console.log(e);
      this.nzMessageService.error('There was an error');
      this.saving = false;
      return;
    }

    this.nzMessageService.success('Password changed');
    this.saving = false;
    this.isVisible = false;
  }
}

export const passwordsMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const newPassword = group.get('newPassword')?.value as string | null;
  const confirmPassword = group.get('confirmPassword')?.value as string | null;

  if (newPassword === confirmPassword || newPassword === '' || confirmPassword === '' || !newPassword || !confirmPassword) {
    return null;
  }

  return { message: 'Passwords must match' };
};
