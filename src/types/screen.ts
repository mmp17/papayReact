import { BoArticle } from "./boArticle";
import { Product } from "./product";
import { Restaurant } from "./user";
// These are used to type the elements of arrays in the state interfaces.

// AppRootState Interface
// is an interface representing the overall shape of application's state.
export interface AppRootState {
  homePage: HomePageState; // It contains property homePage, typed as HomePageState.
  restaurantPage: RestaurantPageState;
}

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

// RestaurantPageState Interface
export interface RestaurantPageState {
  targetRestaurants: Restaurant[];
  randomRestaurants: Restaurant[];
  chosenRestaurant: Restaurant | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

// TypeScript interfaces that are used to define the shape of the state
// built with Redux, state management library
