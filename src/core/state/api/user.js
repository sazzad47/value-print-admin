import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_BACKEND_URL}/api/user/auth/`,
  }),
  endpoints: (builder) => ({
    refreshToken: builder.mutation({
      query: (data) => ({
        url: "token/refresh/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    verifyLogin: builder.mutation({
      query: (data) => ({
        url: "admin/verify/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "admin/login/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    changePassword: builder.mutation({
      query: ({ userData, access_token }) => ({
        url: "changepassword/",
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ userData, token, id }) => ({
        url: `reset-password/${id}/${token}/`,
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    sendPasswordResetEmail: builder.mutation({
      query: (data) => ({
        url: "send-reset-password-email/",
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    createBillingAddress: builder.mutation({
      query: ({ userData, access_token }) => ({
        url: "billing-address/",
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    updateBillingAddress: builder.mutation({
      query: ({ userData, access_token }) => ({
        url: "billing-address/update/",
        method: "PUT",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getBillingAddress: builder.query({
      query: ({ access_token }) => ({
        url: "billing-address/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    updateProfile: builder.mutation({
      query: ({ userData, access_token }) => {
        const formData = new FormData();
        for (const key in userData) {
          formData.append(key, userData[key]);
        }

        return {
          url: "profile/update/",
          method: "PUT",
          body: formData,
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        };
      },
    }),
    getProfile: builder.query({
      query: ({ access_token }) => ({
        url: "profile/detail/",
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getTransactions: builder.query({
      query: () => ({
        url: 'transactions/all/',
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    deleteTransaction: builder.mutation({
      query: ({ id, access_token }) => ({
        url: `transactions/${id}/delete/`,
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
    getAdminOrders: builder.query({
      query: () => ({
        url: 'orders/admin/all/',
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    updateOrderStage: builder.mutation({
      query: ({stage, order_id}) => ({
        url: `orders/admin/update/${order_id}/`,
        method: "PATCH",
        body: {stage},
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getOrdersByStage: builder.query({
      query: ({stage}) => ({
        url: `orders/${stage}/`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }),
    }),
    getOrderDetails: builder.query({
      query: ({ access_token, id }) => ({
        url: `orders/${id}/`,
        method: "GET",
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${access_token}`,
        },
      }),
    }),
  }),
});

export const {
  useRefreshTokenMutation,
  useLoginMutation,
  useVerifyLoginMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useSendPasswordResetEmailMutation,
  useGetBillingAddressQuery,
  useCreateBillingAddressMutation,
  useUpdateBillingAddressMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetTransactionsQuery,
  useDeleteTransactionMutation,
  useGetAdminOrdersQuery,
  useGetOrderDetailsQuery,
  useUpdateOrderStageMutation,
  useGetOrdersByStageQuery
} = userApi;
