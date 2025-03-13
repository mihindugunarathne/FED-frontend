// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.DEV 
      ? "https://fed-storefront-backend-mihindu.onrender.com/api/"
      : "https://fed-storefront-backend-mihindu.onrender.com/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await window.Clerk?.session?.getToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => `products`,
    }),
    getCategories: builder.query({
      query: () => `categories`,
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`,
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: '/orders',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
        credentials: 'include'
      }),
      invalidatesTags: ['Cart', 'Products'] // Add this to refresh products after order
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    getUserOrders: builder.query({
      query: () => `orders/user/orders`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetProductQuery,
  useGetUserOrdersQuery,
} = Api;
