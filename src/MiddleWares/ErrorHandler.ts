import { NextFunction, Request, Response } from "express";
import { Exception } from "../Exceptions/BaseException";

function ErrorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    console.log(error.stack);
    let statusCode = 500; //Internal Server Error
    
    if (error instanceof Exception) {
        statusCode = error.statusCode
    }

    res.status(statusCode).send({
        success: false,
        message: error.message
    });
}

export default ErrorHandler;
