import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultModalSignalComponent } from './default-modal-signal.component';

describe('DefaultModalSignalComponent', () => {
  let component: DefaultModalSignalComponent;
  let fixture: ComponentFixture<DefaultModalSignalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefaultModalSignalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DefaultModalSignalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
