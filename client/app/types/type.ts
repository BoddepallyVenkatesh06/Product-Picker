export interface IProduct {
    _id: string;
    title: string;
    description: string;
    price: number;
    status: 'pending' | 'approved' | 'rejected';
    createdBy:{
        name:string;
        email:string;
    };
    image?:string;
    updatedAt: string;
    createdAt: string;
}




interface IUpdatedFields {
    title?: string;
    description?: string;
    price?: number;
}

interface ISubmittedBy {
    _id: string;
    name: string;
    email: string;
}

interface IReviewedBy {
    _id: string;
    name: string;
    email: string;
}

export interface IRequest {
    _id: string;
    productId: IProduct;
    updatedFields: IUpdatedFields;
    status: string;
    submittedBy: ISubmittedBy;
    reviewedBy: IReviewedBy;
    __v: number;
    updatedAt: string;
    createdAt: string;
    comment: string;
}



export interface IProfileStats {
    totalRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    pendingRequests: number;
  }
  