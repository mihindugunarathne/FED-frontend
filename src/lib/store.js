import { configureStore } from "@reduxjs/toolkit";
import { Api } from "./api";
import { baseApi } from "@/store/api/baseApi";
import cartReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Api.middleware)
      .concat(baseApi.middleware),
});
