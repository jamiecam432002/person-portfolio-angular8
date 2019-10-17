import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grocery-list',
  templateUrl: './grocery-list.component.html',
  styleUrls: ['./grocery-list.component.scss']
})
export class GroceryListComponent implements OnInit {

  @Input() items: [];

  constructor() { }

  ngOnInit() {
  }

}
