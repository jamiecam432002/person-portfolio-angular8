import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeditListItemComponent } from './gedit-list-item.component';

describe('GeditListItemComponent', () => {
  let component: GeditListItemComponent;
  let fixture: ComponentFixture<GeditListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeditListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeditListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
