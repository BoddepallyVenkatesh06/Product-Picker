import { apiSlice } from "../api/apiSlice";



export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get-pending-reviews
        pendingRequests: builder.query({
            query: () => ({
                url: "/review/get-pending-reviews",
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET PENDING REQUESTS API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET PENDING REQUESTS API ERROR => ", error)
                }
            }
        }),
        


        // Submit Review
        submitReview: builder.mutation({
            query: ({productId, updatedFields}) => ({
                url: `/review/submit-review/${productId}`,
                method: "POST",
                body:{updatedFields},
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("SUBMIT REVIEW (TEAM-MEMBER) API RESULT => ", result)
                } catch (error: any) {
                    console.log("SUBMIT REVIEW (TEAM-MEMBER) API ERROR => ", error)
                }
            }
        }),


        // get-pending-reviews
        getSingleReview: builder.query({
            query: ({request_id:reviewId}) => ({
                url: `/review/get-single-review/${reviewId}`,
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET SINGLE REVIEW (ADMIN) API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET SINGLE REVIEW (ADMIN) API ERROR => ", error)
                }
            }
        }),


        // Review Submission
        reviewSubmission: builder.mutation({
            query: ({reviewId, status, comment}) => ({
                url: `/review/review-submission/${reviewId}`,
                method: "PUT",
                body:{status, comment},
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("REVIEW SUBMISSION (ADMIN) API RESULT => ", result)
                } catch (error: any) {
                    console.log("REVIEW SUBMISSION (ADMIN) API ERROR => ", error)
                }
            }
        }),


        // get Profile Stats
        getProfileStats: builder.query({
            query: () => ({
                url: `/review/get-profile-stats`,
                method: "GET",
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    console.log("GET PROFILE STATS API RESULT => ", result)
                } catch (error: any) {
                    console.log("GET PROFILE STATS API ERROR => ", error)
                }
            }
        }),


 // get My Submissions (Team member)
 getMySubmissions: builder.query({
    query: ({request_id:reviewId}) => ({
        url: "/review/my-submissions",
        method: "GET",
        credentials: "include" as const,
    }),
    async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
            const result = await queryFulfilled;
            console.log("GET MY ALL SUBMISSIONS (TEAM MEMBER) API RESULT => ", result)
        } catch (error: any) {
            console.log("GET MY ALL SUBMISSIONS (TEAM MEMBER) API ERROR => ", error)
        }
    }
}),
    }),
});


export const {  
    usePendingRequestsQuery ,
    useSubmitReviewMutation,
    useGetSingleReviewQuery, 
    useReviewSubmissionMutation ,
    useGetProfileStatsQuery ,
    useGetMySubmissionsQuery ,
} = reviewApi