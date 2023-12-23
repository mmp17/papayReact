// data reader, i.e The provided code is a collection of selector functions
// for a Redux store, using the reselect library.
import { createSelector } from "reselect";
import { HomePage } from ".";
import { AppRootState } from "../../../types/screen";

// Base Selector i.e A basic selector that takes the entire application state
const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTopRestaurants = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topRestaurants
);

//  Gets the topRestaurants array from the homePage state.
export const retrieveBestRestaurants = createSelector(
  selectHomePage,
  //  Each selector computes and retrieves a specific part of the homePage state.
  (HomePage) => HomePage.bestRestaurants
  // Gets the bestRestaurants array.
);
export const retrieveTrendProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendProducts
);
export const retrieveBestBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestBoArticles
);
export const retrieveTrendBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendBoArticles
);
export const retrieveNewsBoArticles = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newsBoArticles
);

// The use of createSelector from reselect means that these selectors are memoized.
// Memoization is an optimization technique that ensures the selector only recomputes when the relevant part of the state changes
// These selectors would be used in React components, typically in conjunction with the useSelector hook from react-redux,
// to access the specific parts of the Redux state
