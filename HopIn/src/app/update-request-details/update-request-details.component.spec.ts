import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRequestDetailsComponent } from './update-request-details.component';

describe('UpdateRequestDetailsComponent', () => {
  let component: UpdateRequestDetailsComponent;
  let fixture: ComponentFixture<UpdateRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
