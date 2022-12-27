import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestDetailsContainerComponent } from './admin-request-details-container.component';

describe('AdminRequestDetailsContainerComponent', () => {
  let component: AdminRequestDetailsContainerComponent;
  let fixture: ComponentFixture<AdminRequestDetailsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestDetailsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestDetailsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
