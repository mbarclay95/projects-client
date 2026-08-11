import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRosterComponent } from './my-roster.component';
import { createDraft } from '../../models/draft.model';

describe('MyRosterComponent', () => {
  let component: MyRosterComponent;
  let fixture: ComponentFixture<MyRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRosterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRosterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('draft', createDraft({ id: 1 }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
