
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user.model';
import ErrorHandler from './../utils/ErrorHandler';
import { catchAsyncError } from './../utils/catchAsyncError';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import sendMail from './../utils/sendMail';
import path from 'path';
import ejs from 'ejs';
import optGenerator from 'otp-generator';
import { sendToken, accessTokenOptions, refreshTokenOptions, } from '../utils/jwt';
import { redis } from '../utils/redis';




// =========================== REGISTER USER ===========================
interface IRagistrationBody {
    name: string,
    email: string,
    accountType: string,
    password: string,
}

export const registerUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, accountType, password } = req.body

        // validate data
        if (!name || !email || !password || !accountType) {
            return next(new ErrorHandler('All fields are required', 400, "Error while registering user"))
        }

        // check user already exist or not
        const isUserAlreadyExist = await User.findOne({ email })
        if (isUserAlreadyExist) {
            return next(new ErrorHandler('User already exist', 400, "Error while registering user"))
        }

        // create user data
        const user: IRagistrationBody = {
            name,
            email,
            password,
            accountType,
        }

        // create token and OTP
        const activationToken = createActivationToken(user)
        const activationCode = activationToken.activationCode

        // send otp through email 
        const emailData = { user: { name: user.name, accountType: user.accountType }, activationCode }
        const html = await ejs.renderFile(path.join(__dirname, "../mails/activation-mail.ejs"), emailData)


        try {
            await sendMail({
                email: email,
                subject: "Activate your account on 'Product Picker' Platform",
                template: html,
                emailData
            })

            // send success message
            res.status(201).json({
                success: true,
                activationToken: activationToken.token,
                message: `Please check your email : ${email} to activate your account`
            })
        } catch (error: any) {
            console.log(`Error while sending email to user with email : ${email} => `, error)
            return next(new ErrorHandler(error.message, 400, "Error while registering user"))
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while registering user"))
    }
})




// =========================== CREATE ACTIVATION TOKEN (JWT TOKEN) ===========================
interface IActivationToken {
    token: string,
    activationCode: string
}

export const createActivationToken = (user: any): IActivationToken => {

    // generate Otp
    const activationCode = optGenerator.generate(4, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    })

    const token = jwt.sign(
        {
            user,
            activationCode
        },
        process.env.ACTIVATION_SECRET as Secret,
        {
            expiresIn: "5m"
        }
    );

    return { token, activationCode };
};




// =========================== ACTIVATE USER ===========================
interface IActivationRequest {
    activation_token: string,
    activation_code: string
}

export const activateUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { activation_token, activation_code } = req.body as IActivationRequest;

        if (!activation_token || !activation_code) {
            return next(new ErrorHandler('activation_token and activation_code are required', 400, "Error while activating user"));
        }

        const newUser: { user: IUser; activationCode: string } = jwt.verify(
            activation_token,
            process.env.ACTIVATION_SECRET as string
        ) as { user: IUser; activationCode: string };


        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400, "Error while activating user"));
        }

        const { name, email, password, accountType } = newUser.user;
        // console.log({ name, email, password, accountType })

        // Store user data in the database
        const user = await User.create({
            name, email, password, accountType,
        });

        res.status(201).json({
            success: true,
            user,
            message: "User registered successfully 👍",
        });
    } catch (error: any) {
        console.log(error);
        return next(new ErrorHandler(error.message, 400, "Error while activating user"));
    }
}
);





// =========================== LOGIN USER ===========================
interface ILoginRequest {
    email: string,
    password: string
}

export const loginUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body as ILoginRequest

        // validate data
        if (!email || !password) {
            return next(new ErrorHandler('Please enter your email and password', 400, "Error while loging user"));
        }

        // check user has register or not
        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return next(new ErrorHandler('Invalid email', 400, "Error while loging user"));
        }
        // console.log({ user })


        // compare user entered password , with hashed password store in DB
        const isPasswordMatch = await user.comparePassword(password)
        if (!isPasswordMatch) {
            return next(new ErrorHandler('Invalid password', 400, "Error while loging user"));
        }
        // set the password field to an empty string in the user object ,
        user.password = ''


        // send Token
        sendToken(user, 200, res)


    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while loging user"));
    }
})





// =========================== LOGOUT USER ===========================
export const logoutUser = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id || ""

        // remove id from redis
        redis.del(userId)

        // set cookies empty
        res.cookie("access_token", '', { maxAge: 1 });
        res.cookie("refresh_token", '', { maxAge: 1 });

        res.status(200).json({
            success: true,
            message: "User logout successfully"
        });

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while logout user"));
    }
})







// =========================== UPDATE ACCCESS TOKEN ===========================
export const updateAccessToken = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
      
        const refresh_token = req.headers.authorization?.split(' ')[1]
            || req.cookies.refresh_token as string;
        

        const decodedToken = jwt.verify(
            refresh_token,
            process.env.REFRESH_TOKEN_SECRET as string
        ) as JwtPayload;


        if (!decodedToken) {
            return next(new ErrorHandler('Could not refresh token, refresh_token is invalid', 400, "Error while updating access token"));
        }
        // get data from redis
        const session = await redis.get(decodedToken._id as string);
        if (!session) {
            return next(new ErrorHandler('Please login to access this resource ,could not get user data from redis', 400, "Error while updating access token"));
        }

        const user = JSON.parse(session);


        // create tokens
        const accessToken = jwt.sign(
            { _id: user._id, accountType: user.accountType, email: user.email, name: user.name },
            process.env.ACCESS_TOKEN_SECRET as string,
            { expiresIn: "5m" }
        );

        const refreshToken = jwt.sign(
            { _id: user._id, accountType: user.accountType, email: user.email, name: user.name },
            process.env.REFRESH_TOKEN_SECRET as string,
            { expiresIn: "3d" }
        );

        // store in request
        req.user = user

        // set cookies
        res.cookie("access_token", accessToken, accessTokenOptions);
        res.cookie("refresh_token", refreshToken, refreshTokenOptions);

        // store in redis with 7 days expiry time
        await redis.set(user._id, JSON.stringify(user), "EX", 604800) // 7 days

        next()

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while updating access token"));
    }
})






// =========================== GET USER INFO ===========================
export const getUserInfo = catchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?._id as string;
        const userJson = await redis.get(userId)
        const access_token = req?.cookies?.access_token as string


        if (userJson) {
            const user = JSON.parse(userJson)
            res.status(201).json({
                success: true,
                user,
                access_token,
                message: "User data fetch by ID successfully"
            })
        }

    } catch (error: any) {
        return next(new ErrorHandler(error.message, 400, "Error while fetching userInfo"));
    }
})