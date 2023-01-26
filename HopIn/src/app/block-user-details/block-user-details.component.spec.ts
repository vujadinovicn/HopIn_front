import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockUserDetailsComponent } from './block-user-details.component';

describe('BlockUserDetailsComponent', () => {
  let component: BlockUserDetailsComponent;
  let fixture: ComponentFixture<BlockUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
