import { Component, OnInit, Output, AfterViewInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ListService } from '../list.service';
import { LikesService } from '../likes.service';

import { FormGroup, FormControl } from '@angular/forms'; 
import { Recipe } from '../models/recipe';
import { Like } from '../models/like';
import { Ingredient } from '../models/ingredient';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DisclaimerComponent } from '../dialogs/disclaimer/disclaimer.component';
import { Title, Meta } from '@angular/platform-browser';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  data = {
    name: 'Recipe App in Angular 8',
    bio: 'I created an app that pulls recipes from the Food2Fork api, allows you to favorite your favorite recipes, and add the needed ingredients to a shopping list. It is integrated into Firebase so the data persists.'
  }

  constructor(private recipeService: RecipeService, private listService: ListService, private likesService: LikesService, private breakpointObserver: BreakpointObserver, public dialog: MatDialog, private title: Title, private meta: Meta) { }

  isSmallScreen: boolean = false;

  @Output() searchIsLoading = false;
  @Output() recipeIsLoading = false;
  
  results: [] = [];
  searchForm: FormGroup;
  @Output() recipe: Recipe = <Recipe>{}
  @Output() recipeIsLiked: Boolean;

  @Output() listCollection$: Observable<Ingredient[]>;
  @Output() shoppingList: Ingredient[] = [];

  @Output() likesCollection$: Observable<Like[]>;
  @Output() likes: Like[] = [];
  @Output() activeRecipe: string;

  @Output() shouldResultsFold: boolean = false;


  ngOnInit() {
    this.checkScreen();
    this.searchForm = new FormGroup({
      search: new FormControl('')
    });

    this.getList();
    this.getLikes();

    this.title.setTitle(this.data.name);
    this.meta.addTags([
      { name: 'twitter:card', content: 'summary' },
      { name: 'og:url', content: '/forkify' },
      { name: 'og:title', content: this.data.name },
      { name: 'og:description', content: this.data.bio }
    ])
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  checkScreen() {
    this.isSmallScreen = this.breakpointObserver.isMatched('(max-width: 1068px)');
  }
  onSubmitSearch(form) {
    this.searchIsLoading = true;
    if (form.value) {
      let searchQuery = form.value.search;

      this.getResults(searchQuery).then(recipes => {
        this.results = recipes;
        this.searchForm.reset();
        this.searchIsLoading = false;
        return this.results;
      });
    }
    
  }

  getList() {
    this.listCollection$ = this.listService.getList();
    this.listCollection$.subscribe(data => {
      this.shoppingList = data;
    })
  }
  getLikes() {
    this.likesCollection$ = this.likesService.getLikes();
    this.likesCollection$.subscribe(data => {
      this.likes = data;
    })
  }
  
  getResults(query) {
    return this.recipeService.getResults(query);
  };

  getRecipe(id) {
    return this.recipeService.getRecipe(id);
  }

  calcTime(recipe) {
    // assuming that we need 15 mins prep for every 3 ingredients
    const numIng = recipe.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.recipe.time = periods * 15;
  }

  calcServings(recipe) {
    this.recipe.servings = 4;
  }
  onUnfoldResults(e) {
    this.shouldResultsFold = false;
  }
  onRecipeChange(recId) {
    // check if results should fold in -- ie on mobile YES
    if(this.isSmallScreen) {
      this.shouldResultsFold = true;
    }
    this.recipe = <Recipe>{};
    this.recipeIsLoading = true;
    this.getRecipe(recId).then(recipe => {
      this.recipe.title = recipe.data.recipe.title;
      this.recipe.author = recipe.data.recipe.publisher;
      this.recipe.img = recipe.data.recipe.image_url;
      this.recipe.url = recipe.data.recipe.source_url;
      this.recipe.ingredients = recipe.data.recipe.ingredients;
      this.recipe.id = recipe.data.recipe.recipe_id;
      this.calcTime(this.recipe);
      this.calcServings(this.recipe);
      this.parseIngredients();
      this.activeRecipe = recId;
      this.recipeIsLoading = false;

      this.checkIsLiked(recId);
    });
  }

  onAddIngredients(ingredients) {
    this.listService.addItems(ingredients);
  }
  onDeleteIngredient(id) {
    this.listService.deleteItem(id);
  }
  onClearList(list) {
    this.listService.clearList(list);
  }

  onRecipeLikeToggle(event) {
    if(this.recipeIsLiked === true) {
      // remove the like
      this.likesService.deleteLike(this.activeRecipe).then(() => {
        this.recipeIsLiked = false;
      })
    }else{
      // add the like
      const like: Like = {
        title: event.title,
        author: event.author,
        img: event.img,
        url: event.url
      }
      this.likesService.addLike(like, this.activeRecipe);
      this.recipeIsLiked = true;
    }
    
    const recId = event.id;
    
  }

  checkIsLiked(id) {
    this.likesService.checkForLike(id).then(data => {
      this.recipeIsLiked = data;
    });
  }
  updateServings(type) {
    // Servings
    const newServings = type === 'dec' ? this.recipe.servings - 1 : this.recipe.servings + 1;

    // Ingredients
    this.recipe.ingredients.forEach(ing => {
      ing.count *= (newServings / this.recipe.servings); 
    })

    this.recipe.servings = newServings;
  }

  parseIngredients() {

    const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
    const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    const units = [...unitsShort, 'kg', 'g'];

    const newIngredients = this.recipe.ingredients.map(el => {
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      const arrIng = ingredient.split(' ');
      const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

      let objIng: Ingredient;

      if(unitIndex > -1) {
        const arrCount = arrIng.slice(0, unitIndex);
        let count;

        if(arrCount.length === 1) {
          count = eval(arrIng[0].replace('-', '+'));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join('+'));
        }

        objIng = <Ingredient>{
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(' ')
        }
      } else if(parseInt(arrIng[0], 10)) {
        objIng = <Ingredient>{
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.splice(1).join(' ')
        }
      } else if(unitIndex === -1) {
        objIng = <Ingredient>{
          count: 1,
          unit: '',
          ingredient
        }
      }
      return objIng;
    });
    this.recipe.ingredients = newIngredients;
  };

  recipeClick(event) {
    if(event.target.matches('.btn-decrease, .btn-decrease *')) {
      // decrease button is clicked
      if(this.recipe.servings > 1) {
        this.updateServings('dec');
      }
    } else if (event.target.matches('.btn-increase, .btn-increase *')) {
      // increase button is clicked
      this.updateServings('inc');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DisclaimerComponent, {
      width: '500px',
      maxWidth: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
