import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/counter/counterSlice";
import accountReducer from "../redux/account/account.slice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    account: accountReducer,
  },
});
