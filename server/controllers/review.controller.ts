import { NextFunction, Request, Response } from "express";
import ProductModel from "../models/product.model";
import { catchAsyncError } from "../utils/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import ReviewModel from './../models/review.model';




// =========================== SUBMIT REVIEW ===========================
export const submitReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { productId } = req.params;
        const { updatedFields } = req.body;
        const userId = req?.user?._id;
        console.log("productId = ", productId)
        console.log("updatedFields = ", updatedFields)

        // Check if the product exists
        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        // Create a new review entry with status as 'pending'
        const newReview = await ReviewModel.create({
            productId: product._id,
            updatedFields,
            submittedBy: userId,
            createdAt: Date.now(),
            // status: 'pending'
        });


        return res.status(201).json({
            message: 'Review submitted for approval',
            review: newReview
        });
    }
    catch (error:any) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});




// =========================== REVIEW SUBMISSION ===========================
interface IReviewSubmission {
    status: string,
    comment: string,
}

export const reviewSubmission = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { reviewId } = req.params;
        const { status, comment } = req.body as IReviewSubmission;  // 'pending' | 'approved' | 'rejected'
        const adminId = req.user?._id;

        // validate data
        if (!reviewId || !status) {
            return next(new ErrorHandler('reviewId and status fields are required', 400, "Error while product review submission"))
        }

        const review = await ReviewModel.findById(reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        if (status === 'approved') {
            // Update the product with the approved changes and set status to 'approved'
            await ProductModel.findByIdAndUpdate(
                review.productId,
                { ...review.updatedFields, status: 'approved' }
            );
        }

        review.status = status;
        review.comment = comment;   // The admin can add comments or explanations related to the product changes.
        review.reviewedBy = adminId;
        review.updatedAt = Date.now();

        await review.save();

        return res.status(200).json({
            message: `Review ${status}`,
            review
        });
    } catch (error:any) {
        return next(new ErrorHandler(error.message, 400, "Error while product review submission"));
    }
});




// =========================== GET SINGLE REVIEW ===========================
export const getSingleReview = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { reviewId } = req.params

        // find reviews with 'pending' mark
        const review = await ReviewModel.findById(reviewId)
            .populate('submittedBy', 'name email')
            .populate('reviewedBy', 'name email')
            .populate('productId', 'title description price image');


        return res.status(201).json({
            message: 'Single review fetched successfully',
            review
        });
    }
    catch (error:any) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});



// =========================== SUBMIT REVIEW ===========================
export const getAllPendingReviews = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        // find reviews with 'pending' mark
        const pendingReviews = await ReviewModel.find({
            status: 'pending'
        })
            .populate('submittedBy', 'name email')
            .populate('reviewedBy', 'name email')
            .populate('productId', 'title')
            .sort({ createdAt: -1 }); // Sorting in descending order of creation time



        return res.status(201).json({
            message: 'All pending reviews fetched successfully',
            pendingReviews
        });
    }
    catch (error:any) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});






// =========================== GET PROFILE STATS ===========================
type ProfileStats = {
    totalRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    pendingRequests: number;
}


export const getProfileStats = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req?.user?._id
        const userRole = req.user?.accountType

        let stats: ProfileStats;

        // Fetch stats for admin
        if (userRole === 'Admin') {
            const totalRequests = await ReviewModel.countDocuments({ reviewedBy: userId })
            const approvedRequests = await ReviewModel.countDocuments({ reviewedBy: userId, status: 'approved' })
            const rejectedRequests = await ReviewModel.countDocuments({ reviewedBy: userId, status: 'rejected' })
            const pendingRequests = await ReviewModel.countDocuments({ status: 'pending' })

            stats = {
                totalRequests,
                approvedRequests,
                rejectedRequests,
                pendingRequests,
            };
            // Fetch stats for team member
        } else if (userRole === 'Team member') {
            const totalRequests = await ReviewModel.countDocuments({ submittedBy: userId })
            const approvedRequests = await ReviewModel.countDocuments({ submittedBy: userId, status: 'approved' })
            const rejectedRequests = await ReviewModel.countDocuments({ submittedBy: userId, status: 'rejected' })
            const pendingRequests = await ReviewModel.countDocuments({ submittedBy: userId, status: 'pending' })

            stats = {
                totalRequests,
                approvedRequests,
                rejectedRequests,
                pendingRequests
            };
        } else {
            return res.status(403).json({ message: 'Unauthorized access' })
        }

        // send suceess response
        return res.status(200).json({
            success: true,
            stats,
            message: "Profile stats fetched successfully"
        });
    }
    catch (error:any) {
        return next(new ErrorHandler(error.message, 400, "Error while submit review"));
    }
});




// =========================== MY SUBMISSION (TEAM MEMBER) ===========================
export const mySubmissions = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {

        const userId = req?.user?._id

        // find reviews with 'pending' mark
        const allSubmissions = await ReviewModel.find({
            submittedBy: userId
        })
        .populate('reviewedBy', 'name email createdAt updatedAt')
        .populate('productId', 'title description price image createdAt')
        .sort({ createdAt: -1 }); // Sorting in descending order of creation time

        return res.status(201).json({
            message: 'All submissions of team member fetched successfully',
            allSubmissions
        });
    }
    catch (error:any) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching all submissions of team member"));
    }
});