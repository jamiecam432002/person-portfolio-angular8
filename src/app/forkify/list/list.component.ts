import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() shoppingList: Ingredient[];
  @Output() deleteItem = new EventEmitter();
  @Output() clearList = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  onItemDelete(event) {
    this.deleteItem.emit(event);
  }
  
  onListClear(list) {
    this.clearList.emit(list);
  }

  onSendToGroceryList(list) {

  }

}
