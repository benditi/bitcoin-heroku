import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneMoveComponent } from './one-move.component';

describe('OneMoveComponent', () => {
  let component: OneMoveComponent;
  let fixture: ComponentFixture<OneMoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneMoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
