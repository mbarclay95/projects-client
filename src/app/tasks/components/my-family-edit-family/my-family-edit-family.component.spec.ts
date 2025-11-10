import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFamilyEditFamilyComponent } from './my-family-edit-family.component';

describe('MyFamilyEditFamilyComponent', () => {
  let component: MyFamilyEditFamilyComponent;
  let fixture: ComponentFixture<MyFamilyEditFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyFamilyEditFamilyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFamilyEditFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
