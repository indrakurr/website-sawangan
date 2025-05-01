import { configureStore } from "@reduxjs/toolkit";
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
      query: () => ({ url: "/auth/logout", method: "DELETE" }),
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
        url: "/auth/google-oauth",
        method: "POST",
        body: payload,
      }),
    }),

    // === PROFILE ===
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
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
        url: "/profile/change-password",
        method: "PATCH",
        body: payload,
      }),
    }),
    uploadPhoto: builder.mutation({
      query: (formData) => ({
        url: "/profile/upload-photo",
        method: "POST",
        body: formData,
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

    // === WISHLIST ===
    addWishlist: builder.mutation({
      query: (payload) => ({
        url: "/wishlist",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlist: builder.query({
      query: () => "/wishlist",
      providesTags: ["Wishlist"],
    }),
    removeWishlist: builder.mutation({
      query: (id) => ({
        url: `/wishlist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    checkWishlist: builder.query({
      query: (id) => `/wishlist/check/${id}`,
      providesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation({
      query: () => ({
        url: "/wishlist",
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),

    // === CART ===
    getCarts: builder.query({
      query: () => "/carts",
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (payload) => ({
        url: "/cart",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCart: builder.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCarts: builder.mutation({
      query: () => ({
        url: "/carts",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // === CHECKOUT ===
    checkout: builder.mutation({
      query: (payload) => ({
        url: "/checkout",
        method: "POST",
        body: payload,
      }),
    }),
    postNotifications: builder.mutation({
      query: (payload) => ({
        url: "/notifications",
        method: "POST",
        body: payload,
      }),
    }),

    // === RAJA ONGKIR ===
    getShippingLocations: builder.query({
      query: () => "/rajaongkir/locations",
      providesTags: ["RajaOngkir"],
    }),
    getCourierOptions: builder.query({
      query: ({ origin, destination, weight }) =>
        `/rajaongkir/couriers?origin=${origin}&destination=${destination}&weight=${weight}`,
      providesTags: ["RajaOngkir"],
    }),
    getTracking: builder.query({
      query: (trackingNumber) => `/rajaongkir/tracking/${trackingNumber}`,
      providesTags: ["RajaOngkir"],
    }),

    // === ORDER ===
    getOrders: builder.query({
      query: () => "/order",
      providesTags: ["Order"],
    }),
    getOrderById: builder.query({
      query: (id) => `/order/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // === REVIEW ===
    completeReview: builder.mutation({
      query: (payload) => ({
        url: "/review/complete",
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Review"],
    }),
    postReview: builder.mutation({
      query: (payload) => ({
        url: "/review",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Review"],
    }),
    getReview: builder.query({
      query: () => "/review",
      providesTags: ["Review"],
    }),

    // === ADMIN ===
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["Admin"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
    createProductAdmin: builder.mutation({
      query: (payload) => ({
        url: "/products",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProductAdmin: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Products"],
    }),
    patchOrderAdmin: builder.mutation({
      query: ({ id, ...payload }) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Order"],
    }),
    deleteProductAdmin: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    deleteOrderAdmin: builder.mutation({
      query: (id) => ({
        url: `/order/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Ekspor hooks otomatis
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
  useUploadPhotoMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddWishlistMutation,
  useGetWishlistQuery,
  useRemoveWishlistMutation,
  useCheckWishlistQuery,
  useClearWishlistMutation,
  useGetCartsQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveCartMutation,
  useClearCartsMutation,
  useCheckoutMutation,
  usePostNotificationsMutation,
  useGetShippingLocationsQuery,
  useGetCourierOptionsQuery,
  useGetTrackingQuery,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useCompleteReviewMutation,
  usePostReviewMutation,
  useGetReviewQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  useCreateProductAdminMutation,
  useUpdateProductAdminMutation,
  usePatchOrderAdminMutation,
  useDeleteProductAdminMutation,
  useDeleteOrderAdminMutation,
} = apiSlice;
