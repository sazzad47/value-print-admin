import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_BACKEND_URL}/api/products/`,
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: ({ data, access_token }) => ({
        url: "categories/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: "categories/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getCategory: builder.query({
      query: ({id}) => ({
        url: `categories/${id}/get/`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    deleteCategory: builder.mutation({
      query: ({ id, access_token }) => ({
        url: `categories/${id}/delete/`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    updateCategory: builder.mutation({
      query: ({ data, id, access_token }) => ({
        url: `categories/${id}/update/`,
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    createProduct: builder.mutation({
      query: ({ data, access_token }) => ({
        url: "list/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: "list/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getProduct: builder.query({
      query: ({id}) => ({
        url: `list/${id}/get/`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ id, access_token }) => ({
        url: `list/${id}/delete/`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ data, id, access_token }) => ({
        url: `list/${id}/update/`,
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productApi;
