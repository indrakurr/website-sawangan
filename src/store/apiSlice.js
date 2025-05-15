import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Auth",
    "Profile",
    "Products",
    "Wishlist",
    "Cart",
    "Order",
    "Review",
    "RajaOngkir",
    "Admin",
  ],
  endpoints: (builder) => ({
    // === AUTH ===
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "DELETE",
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation({
      query: (payload) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
    oauthGoogle: builder.mutation({
      query: (payload) => ({
        url: "/auth/google",
        method: "POST",
        body: payload,
        headers: {},
      }),
    }),

    // === PROFILE ===
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
      refetchOnMountOrArgChange: true,
    }),
    updateProfile: builder.mutation({
      query: (payload) => ({
        url: "/profile",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Profile"],
    }),
    changePassword: builder.mutation({
      query: (payload) => ({
        url: "/profile/changepassword",
        method: "PATCH",
        body: payload,
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "/profile/avatar",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Profile"],
    }),

    // === PRODUCTS ===
    getProducts: builder.query({
      query: () => "/products",
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),

    // === CART ===
    getCart: builder.query({
      query: () => "/cart",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/cart/items",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/cart/items/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    deleteCartItem: builder.mutation({
      query: (productId) => ({
        url: `/cart/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // === ADMIN ===
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/admin/products",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/admin/products/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ productId, formData }) => ({
        url: `/admin/products/${productId}`,
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Products"],
    }),

    getAdminUsers: builder.query({
      query: () => "/admin/users",
      providesTags: ["Admin"],
    }),
    deleteAdminUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    getAdminOrders: builder.query({
      query: () => "/admin/orders",
      providesTags: ["Admin"],
    }),

    getAdminOrderById: builder.query({
      query: (orderId) => `/admin/orders/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "Admin", id: orderId },
      ],
    }),

    updateAdminOrderStatus: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `/admin/orders/${orderId}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Admin"],
    }),
    deleteAdminOrder: builder.mutation({
      query: (orderId) => ({
        url: `/admin/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    // === ORDER ===
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: (result, error, orderId) => [
        { type: "Order", id: orderId },
      ],
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/cancel/${orderId}`,
        method: "POST",
      }),
      invalidatesTags: ["Order"],
    }),
    completeOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/complete/${orderId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Order"],
    }),

    // === DASHBOARD ===
    getDashboardOrders: builder.query({
      query: () => "/admin/dashboard/orders",
      providesTags: ["Admin"],
    }),
    getDashboardProducts: builder.query({
      query: () => "/admin/dashboard/products",
      providesTags: ["Admin"],
    }),
    getDashboardUsers: builder.query({
      query: () => "/admin/dashboard/users",
      providesTags: ["Admin"],
    }),
    getDashboardRevenue: builder.query({
      query: () => "/admin/dashboard/revenue",
      providesTags: ["Admin"],
    }),

    // === REVIEW ===
    submitProductReview: builder.mutation({
      query: ({ orderId, payload }) => ({
        url: `/orders/reviews/${orderId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Order"],
    }),

    // === Tambahan endpoint lainnya bisa lanjut di sini...
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useOauthGoogleMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useUploadAvatarMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetAdminUsersQuery,
  useDeleteAdminUserMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
  useGetAdminOrdersQuery,
  useGetAdminOrderByIdQuery,
  useUpdateAdminOrderStatusMutation,
  useGetDashboardOrdersQuery,
  useGetDashboardProductsQuery,
  useGetDashboardUsersQuery,
  useGetDashboardRevenueQuery,
  useCompleteOrderMutation,
  useDeleteAdminOrderMutation,
  useSubmitProductReviewMutation,
} = apiSlice;
