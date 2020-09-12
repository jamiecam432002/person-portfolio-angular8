import { Injectable } from '@angular/core';
import Axios from 'axios';

export interface Recipe {
  title: string,
  author: string,
  img: string,
  url: string,
  ingredients: string[],
  time: number
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  KEY: string = 'c55e2ccd56fbbeaf360f572e816359c8';
  proxy: string = 'https://cors-anywhere.herokuapp.com/';
  api: string = 'https://forkify-api.herokuapp.com/api';

  constructor() { }

  async getResults(query: string) {

    // use for testing the live api
    let testrecipes;

    try {
      
      const testres = await Axios(`${this.api}/search?&q=${query}`);
      testrecipes = testres.data.recipes

    } catch (error) {
      alert(error);
    }
    return testrecipes;
  }

  async getRecipe(id) {
    try {
      const testrecipe = await Axios(`${this.api}/get?rId=${id}`);

      // return recipe
      return testrecipe;
    } catch(error) {
      console.log(error);
      alert("something went wrong")
    }
  }
}
