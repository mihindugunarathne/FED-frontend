import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "@/store/api/baseApi";  // Use @ alias
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});
