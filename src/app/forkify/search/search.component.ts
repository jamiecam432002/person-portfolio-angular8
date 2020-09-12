import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() results: [];
  @Input() isLoading;
  @Input() isActive;

  @Output() recipeChange = new EventEmitter();
  @Output() unfoldResults = new EventEmitter();

  color = 'accent';
  mode = 'indeterminate';
  value = 90;

  p: number = 1;

  // should the results be hidden - only true on mobile, after selecting a search result
  @Input() resultsShouldFold;

  constructor() { }

  ngOnInit() {
  }

  // function to trim the titles to one line
  limitRecipeTitle(title, limit = 17) {
    const newTitle = [];
    if (title.length > limit) {
      title.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= limit) {
          newTitle.push(cur);
        }
        return acc + cur.length;
      }, 0);
      return `${newTitle.join(' ')} ...`;
    }
    return title;
  }

  onRecipeClick(recipeId) {
    console.log(`recipe has been clicked with ID of ${recipeId}`);
    this.recipeChange.emit(recipeId);
  }

  onResultsBack(e) {
    this.unfoldResults.emit(e);
  }

}
