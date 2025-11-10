import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFamilyMembersComponent } from './my-family-members.component';

describe('MyFamilyMembersComponent', () => {
  let component: MyFamilyMembersComponent;
  let fixture: ComponentFixture<MyFamilyMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFamilyMembersComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFamilyMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
