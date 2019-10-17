import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryMasterListComponent } from './grocery-master-list.component';

describe('GroceryMasterListComponent', () => {
  let component: GroceryMasterListComponent;
  let fixture: ComponentFixture<GroceryMasterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroceryMasterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryMasterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
