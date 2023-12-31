import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Product } from "./product";
import { Member, Restaurant } from "./user";
import { Order } from "./order";
// These are used to type the elements of arrays in the state interfaces.

// AppRootState Interface
// is an interface representing the overall shape of application's state.
export interface AppRootState {
  homePage: HomePageState; // It contains property homePage, typed as HomePageState.
  restaurantPage: RestaurantPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
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

// OrdersPageState Interface
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}

// CommunityPageState Interface
export interface CommunityPageState {
  targetBoArticles: BoArticle[];
}

// MemberPageState Interface
export interface MemberPageState {
  chosenMember: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle?: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}

// TypeScript interfaces that are used to define the shape of the state
// built with Redux, state management library
