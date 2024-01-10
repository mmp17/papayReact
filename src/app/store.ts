// Redux Toolkit Import
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
// Redux Middleware Import
import reduxLogger from "redux-logger";
// Reducer Imports
import HomePageReducer from "./screens/HomePage/slice";
import RestaurantPageReducer from "./screens/RestaurantPage/slice";
import OrdersPageReducer from "./screens/OrdersPage/slice";
import CommunityPageReducer from "./screens/CommunityPage/slice";
import MemberPageReducer from "./screens/MemberPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger),
  // A middleware for logging actions and state changes in the Redux store.
  reducer: {
    homePage: HomePageReducer,
    //  A slice reducer for the home page, imported from a specific path.
    restaurantPage: RestaurantPageReducer,
    ordersPage: OrdersPageReducer,
    communityPage: CommunityPageReducer,
    memberPage: MemberPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
