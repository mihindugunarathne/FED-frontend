import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ['Products', 'Categories'],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-mihindu.onrender.com/api/",
    prepareHeaders: async (headers) => {
      const token = await window.Clerk?.session?.getToken({ template: 'store_admin' });
      
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: ['Products']
    }),
    getCategories: builder.query({
      query: () => "categories",
    }),
    createOrder: builder.mutation({
      query: (order) => ({
        url: "orders",
        method: "POST",
        body: order,
      }),
    }),
    createProduct: builder.mutation({
      query: (data) => {
        console.log('Creating product with data:', data);
        return {
          url: "products",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ['Products']
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
      providesTags: ['Products']
    }),
    getOrder: builder.query({
      query: (id) => `orders/${id}`
    }),
    getUserOrders: builder.query({
      query: () => `orders/user/orders`
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useCreateOrderMutation,
  useCreateProductMutation,
  useGetProductQuery,
  useGetOrderQuery,
  useGetUserOrdersQuery
} = baseApi;