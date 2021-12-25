import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContactsListComponent } from './my-contacts-list.component';

describe('MyContactsListComponent', () => {
  let component: MyContactsListComponent;
  let fixture: ComponentFixture<MyContactsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyContactsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContactsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
