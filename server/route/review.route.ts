import { Router } from "express";
import { isAdmin, isAuthenticated, isTeamMember } from "../middleware/auth";
import { getAllPendingReviews, getProfileStats, reviewSubmission, submitReview, getSingleReview, mySubmissions} from "../controllers/review.controller";
import { updateAccessToken } from "../controllers/user.controller";

const reviewRouter = Router()

// for Authenticated user
reviewRouter.get('/get-profile-stats', updateAccessToken, isAuthenticated, getProfileStats)


// only for Team Member
reviewRouter.post('/submit-review/:productId', updateAccessToken, isAuthenticated, isTeamMember, submitReview)
reviewRouter.get('/my-submissions', updateAccessToken, isAuthenticated, isTeamMember, mySubmissions)


// only for Admin
reviewRouter.put('/review-submission/:reviewId', updateAccessToken, isAuthenticated, isAdmin, reviewSubmission)
reviewRouter.get('/get-pending-reviews', updateAccessToken, isAuthenticated, isAdmin, getAllPendingReviews)
reviewRouter.get('/get-single-review/:reviewId', updateAccessToken, isAuthenticated, isAdmin, getSingleReview)




export default reviewRouter