import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";


const globalErrorHandler = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err.statusCode || 500;
    const errResponse = {
        data: null,
        error: {
            status: statusCode,
            name: err.name || "InternalServerError",
            message: err.message,
            details: err.details || {}
        }
    };

    if (errResponse.error.name === "BadRequestError") {
        errResponse.error.name = "ValidationError";
    };

    return res.status(statusCode).json(errResponse);
};

export default globalErrorHandler;