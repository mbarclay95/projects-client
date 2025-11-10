import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectConfigComponent } from './incorrect-config.component';

describe('IncorrectConfigComponent', () => {
  let component: IncorrectConfigComponent;
  let fixture: ComponentFixture<IncorrectConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncorrectConfigComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IncorrectConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
