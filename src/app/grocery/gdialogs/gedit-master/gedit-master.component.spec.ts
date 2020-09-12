import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeditMasterComponent } from './gedit-master.component';

describe('GeditMasterComponent', () => {
  let component: GeditMasterComponent;
  let fixture: ComponentFixture<GeditMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeditMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeditMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
