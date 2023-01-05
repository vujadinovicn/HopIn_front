import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestsDisplayComponent } from './update-requests-display.component';

describe('UpdateRequestsDisplayComponent', () => {
  let component: UpdateRequestsDisplayComponent;
  let fixture: ComponentFixture<UpdateRequestsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestsDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
