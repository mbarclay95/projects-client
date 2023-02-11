import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileExplorerLayoutComponent } from './file-explorer-layout.component';

describe('FileExplorerLayoutComponent', () => {
  let component: FileExplorerLayoutComponent;
  let fixture: ComponentFixture<FileExplorerLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileExplorerLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileExplorerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
