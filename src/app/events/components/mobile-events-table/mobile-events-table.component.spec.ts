import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileEventsTableComponent } from './mobile-events-table.component';

describe('MobileEventsTableComponent', () => {
  let component: MobileEventsTableComponent;
  let fixture: ComponentFixture<MobileEventsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileEventsTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileEventsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
