import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFamilyPageComponent } from './my-family-page.component';

describe('MyFamilyPageComponent', () => {
  let component: MyFamilyPageComponent;
  let fixture: ComponentFixture<MyFamilyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyFamilyPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFamilyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
