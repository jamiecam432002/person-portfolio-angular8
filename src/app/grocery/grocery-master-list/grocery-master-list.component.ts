import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { GItem } from '../models/g-item';



@Component({
  selector: 'app-grocery-master-list',
  templateUrl: './grocery-master-list.component.html',
  styleUrls: ['./grocery-master-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GroceryMasterListComponent implements OnInit {

  // these are the items that are coming from the parent component, the dashboard
  @Input() items: Observable<GItem[]>;

  constructor() { }

  ngOnInit() {
    
  }

}
