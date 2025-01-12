import { NextFunction, Request, Response } from 'express';
import ErrorHandler from './../utils/ErrorHandler';


export const ErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'
    const customMessage = err.customMessage

    // wrong mongoDB Id error
    if (err.name === 'CastError') {
        const message = `Source not found, Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400, customMessage)
    }

    // Duplicate key error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        err = new ErrorHandler(message, 400, customMessage)
    }

    // wrong jwt error
    if (err.name === 'JsonWebTokenError') {
        const message = `Json web token is invalid , try again`;
        err = new ErrorHandler(message, 400, customMessage)
    }

    // jwt expire error
    if (err.name === 'TokenExpireError') {
        const message = `Json web token is expired, try again`
        err = new ErrorHandler(message, 400, customMessage)
    }


    // return response
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        customMessage
    })
}