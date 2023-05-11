import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipTaskModalComponent } from './skip-task-modal.component';

describe('SkipTaskModalComponent', () => {
  let component: SkipTaskModalComponent;
  let fixture: ComponentFixture<SkipTaskModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkipTaskModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkipTaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
