import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultModalSignalComponent } from './default-modal-signal.component';

describe('DefaultModalSignalComponent', () => {
  let component: DefaultModalSignalComponent<boolean>;
  let fixture: ComponentFixture<DefaultModalSignalComponent<boolean>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultModalSignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent<DefaultModalSignalComponent<boolean>>(DefaultModalSignalComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('openModal', false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
