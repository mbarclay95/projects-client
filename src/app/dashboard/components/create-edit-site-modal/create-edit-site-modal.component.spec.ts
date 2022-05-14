import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditSiteModalComponent } from './create-edit-site-modal.component';

describe('CreateEditSiteModalComponent', () => {
  let component: CreateEditSiteModalComponent;
  let fixture: ComponentFixture<CreateEditSiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateEditSiteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEditSiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
