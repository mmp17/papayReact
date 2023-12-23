// data writer: it is an implementation of a Redux slice using Redux Toolkit, specifically for the homepage of an application.
import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../types/screen";

const initialState: HomePageState = {
  topRestaurants: [],
  bestRestaurants: [],
  trendProducts: [],
  bestBoArticles: [],
  trendBoArticles: [],
  newsBoArticles: [],
};

// CreateSlice Function
const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    // Reducers are defined for updating different parts of the state
    setTopRestaurants: (state, action) => {
      state.topRestaurants = action.payload;
      // Each reducer takes the current state and an action, and updates the state based on the action's payload.
    },
    setBestRestaurants: (state, action) => {
      state.bestRestaurants = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setBestBoArticles: (state, action) => {
      state.bestBoArticles = action.payload;
    },
    setTrendBoArticles: (state, action) => {
      state.trendBoArticles = action.payload;
    },
    setNewsBoArticles: (state, action) => {
      state.newsBoArticles = action.payload;
    },
  },
});
// exported to be used in components
// The actions created by the slice are exported.
//These actions can be dispatched to update the state in the store.
export const {
  setTopRestaurants,
  setBestRestaurants,
  setTrendProducts,
  setBestBoArticles,
  setTrendBoArticles,
  setNewsBoArticles,
} = HomePageSlice.actions;

//connection to store i.e this reducer will be used in the Redux store.
const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;

// The state can be accessed using selectors to display the data in the UI.
// Redux Toolkit's createSlice abstracts the standard boilerplate of writing action creators and reducers, providing a more concise and readable way to handle state updates in Redux.
