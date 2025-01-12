import { Schema, model, models } from 'mongoose';

export interface IProduct {
    title: string;
    description: string;
    // images: string[];
    image: string;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
    createdBy: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}


const productSchema = new Schema<IProduct>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    // images: {
    //     type: [String],
    //     required: true
    // },
    image: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'  // New products start as 'pending'
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }

}, { timestamps: true });



const ProductModel = models.Product || model<IProduct>('Product', productSchema);
export default ProductModel;
