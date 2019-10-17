import { Component, OnInit, Output } from '@angular/core'; 
import { Observable } from 'rxjs';
import { GItemService } from '../g-item.service';
import { GItem } from '../models/g-item';

@Component({
  selector: 'app-grocery-dashboard',
  templateUrl: './grocery-dashboard.component.html',
  styleUrls: ['./grocery-dashboard.component.scss']
})
export class GroceryDashboardComponent implements OnInit {

  masterItems$: Observable<GItem[]>;
  userItems$: Observable<GItem[]>;
  


  items = [
    'Grapes',
    'Peanuts',
    'Milk',
    'Honey'
  ]


  constructor(private groceryService: GItemService) { }

  ngOnInit() {
    this.masterItems$ = this.groceryService.getMasterList();
    this.masterItems$.subscribe(data => console.log(data));
    this.userItems$ = this.groceryService.getUserList();

  }

  

}
