import { Schema, model, models } from 'mongoose';
import { IProduct } from './product.model';


interface IReview {
    productId: Schema.Types.ObjectId;
    updatedFields?: Partial<IProduct>;
    status: 'pending' | 'approved' | 'rejected';
    submittedBy: Schema.Types.ObjectId;
    reviewedBy?: Schema.Types.ObjectId;   // mark as optional, initially the review is not reviewed
    createdAt: Date;
    updatedAt: Date;
    comment?: string; // Optional comment field , The admin can add comments or explanations related to the product changes.
}


const reviewSchema = new Schema<IReview>({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    updatedFields: {
        type: Schema.Types.Mixed,
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    submittedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
}, { timestamps: true });


const ReviewModel = models.Review || model<IReview>('Review', reviewSchema);
export default ReviewModel;
