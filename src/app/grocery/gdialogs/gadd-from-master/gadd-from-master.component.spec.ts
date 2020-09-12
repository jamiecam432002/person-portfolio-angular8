import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaddFromMasterComponent } from './gadd-from-master.component';

describe('GaddFromMasterComponent', () => {
  let component: GaddFromMasterComponent;
  let fixture: ComponentFixture<GaddFromMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaddFromMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaddFromMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
