import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export interface Food {
  open: boolean
  avatar: string
  id: string
  name: string
  rating: number
  image: string
  restaurant: string
  logo: string
  status: "Open Now" | "Closed"
  price: string
  createdAt?: string
}

export const foodApi = createApi({
  reducerPath: "foodApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://6852821e0594059b23cdd834.mockapi.io/",
  }),
  tagTypes: ["Food"],
  endpoints: (builder) => ({
    getFoods: builder.query<Food[], void>({
      query: () => "Food",
      providesTags: ["Food"],
    }),
    searchFoods: builder.query<Food[], string>({
      query: (searchParam) => `Food?name=${searchParam}`,
      providesTags: ["Food"],
    }),
    createFood: builder.mutation<Food, Omit<Food, "id" | "createdAt">>({
      query: (newFood) => ({
        url: "Food",
        method: "POST",
        body: newFood,
      }),
      invalidatesTags: ["Food"],
    }),
    updateFood: builder.mutation<Food, { id: string; food: Partial<Omit<Food, "id" | "createdAt">> }>({
      query: ({ id, food }) => ({
        url: `Food/${id}`,
        method: "PUT",
        body: food,
      }),
      invalidatesTags: ["Food"],
    }),
    deleteFood: builder.mutation<void, string>({
      query: (id) => ({
        url: `Food/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Food"],
    }),
  }),
})

export const {
  useGetFoodsQuery,
  useSearchFoodsQuery,
  useCreateFoodMutation,
  useUpdateFoodMutation,
  useDeleteFoodMutation,
} = foodApi
