import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamiliesTableComponent } from './families-table.component';

describe('FamiliesTableComponent', () => {
  let component: FamiliesTableComponent;
  let fixture: ComponentFixture<FamiliesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamiliesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamiliesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
