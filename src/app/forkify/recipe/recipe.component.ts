import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RecipeService } from './../recipe.service';
import { Recipe } from '../models/recipe';
import { create, all } from 'mathjs';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss'],
})
export class RecipeComponent implements OnInit {

  @Input() recipe: Recipe;
  @Input() isLoading;
  @Input() recipeIsLiked: Boolean;

  @Output() addIngredients = new EventEmitter();
  @Output() toggleLikeRecipe = new EventEmitter();

  color: string = 'accent';
  mode: string = 'indeterminate';
  value: number = 90;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {}

  formatCount(count) {
    const config = {
      number: 'Fraction'
    }
    const math = create(all, config)
    if (count) {
      const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));

      if(!dec) return count;

      if(int === 0) {
        const fr = math.fraction(count);
        return `${fr.n}/${fr.d}`;
        //return `${fr.numerator}/${fr.denominator}`;
      }else{
        const fr = math.fraction(count);
        return `${fr.s} ${fr.n - fr.d}/${fr.d}`;
      }
    }
    return '?';
  }

  onAddIngredientsClick(ingredients) {
    this.addIngredients.emit(ingredients)
  }

  toggleLiked(recipe) {
    console.log(`value from recipe on recipe liked ${recipe.id}`);
    this.toggleLikeRecipe.emit(recipe);
  }


  

}
