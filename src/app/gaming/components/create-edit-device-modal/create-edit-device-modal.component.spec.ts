import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditDeviceModalComponent } from './create-edit-device-modal.component';

describe('CreateEditDeviceModalComponent', () => {
  let component: CreateEditDeviceModalComponent;
  let fixture: ComponentFixture<CreateEditDeviceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditDeviceModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditDeviceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
