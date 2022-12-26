import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestDetailsComponent } from './admin-request-details.component';

describe('AdminRequestDetailsComponent', () => {
  let component: AdminRequestDetailsComponent;
  let fixture: ComponentFixture<AdminRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
