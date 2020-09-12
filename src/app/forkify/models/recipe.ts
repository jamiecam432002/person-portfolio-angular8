import { Ingredient } from './ingredient';

export interface Recipe {
    title: string,
    author: string,
    img: string,
    url: string,
    ingredients: any[],
    time: number,
    servings: number,
    id: string
}
