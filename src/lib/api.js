// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fed-storefront-backend-mihindu.onrender.com/api/",
    prepareHeaders: async (headers) => {
      try {
        // Use the specific template name we created
        const token = await window.Clerk?.session?.getToken({ 
          template: "admin-auth"
        });
        
        if (token) {
          headers.set("authorization", `Bearer ${token}`);
        }
        headers.set("Content-Type", "application/json");
      } catch (error) {
        console.error("Error getting token:", error);
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
    createProduct: builder.mutation({
      query: (data) => ({
        url: 'products',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
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
  useCreateProductMutation,
} = Api;
