import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Like } from '../models/like';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {

  @Input() likes: Like[]; 
  @Output() recipeChange = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  onRecipeClick(recipeId) {
    console.log(`recipe has been clicked with ID of ${recipeId}`);
    this.recipeChange.emit(recipeId);
  }

}
