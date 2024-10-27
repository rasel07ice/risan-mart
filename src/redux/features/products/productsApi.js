import getBaseUrl from "@/utils/baseURL";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getBaseUrl()}/api/products`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer${token}`);
    }
    return Headers;
  },
});
const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    fetchAllProducts: builder.query({
      query: () => "/",
      providesTags: ["Products"],
    }),
    fetchProductById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/",
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (id, ...rest) => ({
        url: `/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useFetchAllProductsQuery,
  useFetchProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
export default productsApi;
