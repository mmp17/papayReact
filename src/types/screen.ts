import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";
// These are used to type the elements of arrays in the state interfaces.

// AppRootState Interface
export interface AppRootState {
  homePage: HomePageState; // It contains property homePage, typed as HomePageState.
}
// is an interface representing the overall shape of application's state.

// HomePageState Interface
// is an interface that represents the shape of the state specifically for a home page in your application.
export interface HomePageState {
  topRestaurants: Restaurant[];
  bestRestaurants: Restaurant[];
  trendProducts: Product[];
  bestBoArticles: BoArticle[];
  trendBoArticles: BoArticle[];
  newsBoArticles: BoArticle[];
}

// TypeScript interfaces that are used to define the shape of the state
// built with Redux, state management library
