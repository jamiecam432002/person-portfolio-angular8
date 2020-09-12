import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeditMasterItemComponent } from './gedit-master-item.component';

describe('GeditMasterItemComponent', () => {
  let component: GeditMasterItemComponent;
  let fixture: ComponentFixture<GeditMasterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeditMasterItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeditMasterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
