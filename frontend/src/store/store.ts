import { configureStore } from "@reduxjs/toolkit";
import { cardSlice } from "./card-slice";
import { categorySlice } from "./category-slice";
import { userSlice } from "./user-slice";

export const store = configureStore({
  reducer: {
    cards: cardSlice.reducer,
    categories: categorySlice.reducer,
    user: userSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
