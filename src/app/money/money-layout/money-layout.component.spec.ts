import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyLayoutComponent } from './money-layout.component';

describe('MoneyLayoutComponent', () => {
  let component: MoneyLayoutComponent;
  let fixture: ComponentFixture<MoneyLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoneyLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MoneyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
