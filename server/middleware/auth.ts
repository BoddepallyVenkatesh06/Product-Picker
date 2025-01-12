
import { Request, Response, NextFunction } from 'express';
import { catchAsyncError } from './../utils/catchAsyncError';
import ErrorHandler from '../utils/ErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { IUser } from '../models/user.model';
require('dotenv').config()



// =========================== IS AUTHENTICATED ===========================
export const isAuthenticated = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const refresh_token = req.headers.authorization?.split(' ')[1]
                                  || req.cookies.refresh_token as string;
        if (!refresh_token) {
            return next(new ErrorHandler('Please login to access this resource', 400, "Error while authenticating"));
        }

        // Decode token
        const decodeToken = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string) as JwtPayload & IUser;
        console.log("decodeToken = ", decodeToken)
        // example - 
        // {
        //    _id: '66ceb5a51b36423638f71e0a',
        //   accountType: 'Team member',
        //   email: 'radhamasale889@gmail.com',       
        //   name: 'Bhavu Gade',
        //   iat: 1725962652,
        //   exp: 1725963072
        // }


        // Type guard to check if decodeToken has all IUser fields
        if (!('_id' in decodeToken) || !('email' in decodeToken) || !('name' in decodeToken)|| !('accountType' in decodeToken)) {
            return next(new ErrorHandler('Access token is invalid', 400, "Error while authenticating"));
        }

        // Attach user to the request
        req.user = decodeToken as IUser;

        // Call next middleware
        next();

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating"));
    }
});




// =========================== IS Team Member ===========================
export const isTeamMember = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // console.log('User data -> ', req.user)
        if (req.user?.accountType !== 'Team member') {
            return next(new ErrorHandler(`Role : ${req.user?.accountType} is not allowed to access this resource`, 403, "Error while authenticating Team Member"));
        }

        // go to next middleware
        next();

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating student"));
    }
})




// =========================== IS ADMIN ===========================
export const isAdmin = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.accountType !== 'Admin') {
            return next(new ErrorHandler(`Role : ${req.user?.accountType} is not allowed to access this resource`, 403, "Error while authenticating Admin"));
        }

        // go to next middleware
        next();

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while authenticating Admin"));
    }
})