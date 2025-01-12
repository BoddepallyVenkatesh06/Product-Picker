import { apiSlice } from "../api/apiSlice";



export const productApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get all products
        // allProducts: builder.query({
        //     query: () => ({
        //         url: "/product/get-products",
        //         method: "GET",
        //         credentials: "include" as const,
        //     }),
        //     async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        //         try {
        //             const result = await queryFulfilled;
        //             console.log("GET ALL PRODUCTS API RESULT => ", result)
        //         } catch (error: any) {
        //             console.log("GET ALL PRODUCTS API ERROR => ", error)
        //         }
        //     }
        // }),

        allProducts: builder.query({
            query: ({ page = 1, limit = 10 }) => ({
                url: `/product/get-products?page=${page}&limit=${limit}`,
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET ALL PRODUCTS API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET ALL PRODUCTS API ERROR => ", error)
                }
            }
        }),

        // get Single Product by id
        getSingleProduct: builder.query({
            query: ({ product_id }) => ({
                url: "/product/get-single-product",
                method: "POST",
                body: { id: product_id },
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET SINGLE PRODUCT API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET SINGLE PRODUCT API ERROR => ", error)
                }
            }
        }),


        // create Product
        createProduct: builder.mutation({
            query: (data) => ({
                url: "/product/create-product",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("CREATE PRODUCT API RESULT => ", result)
                } catch (error: any) {
                    console.log("CREATE PRODUCT API ERROR => ", error)
                }
            }
        }),


    }),
});


export const { useAllProductsQuery, useGetSingleProductQuery, useCreateProductMutation } = productApi