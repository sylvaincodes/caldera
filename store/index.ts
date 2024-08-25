import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";

const rootReducer = combineReducers({ cart: cartReducer, order: orderReducer });

const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type IRootState = ReturnType<typeof store.getState>;
