import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { IRoute } from "../types";


const errorHandler = (callback: IRoute) => {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await callback(req, res, next);
        } catch (error: any) {
            console.error(error);
            return next(createHttpError.InternalServerError("InternalServerError"));
        };
    }
};

export default errorHandler;
