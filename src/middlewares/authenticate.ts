import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import * as Token from "../services/token";
import ErrorHandler from "../utils/errorHandler";
import { AuthRequest } from "../types";


export interface WithAuthOptions {
    include: string[];
    exclude?: string[];
    config: {
        JWT_SECRET_KEY: string;
    }
};


const defaultOptions: Partial<WithAuthOptions> = {
    include: [],
    exclude: []
};


const withAuth = (
    userOptions: WithAuthOptions
) => {
    return ErrorHandler(async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        // Combine defaultOptions and userOptions
        // NOTE: This allows for default values to be used if no options are provided by the user.
        const options = { ...defaultOptions, ...userOptions };

        // Check if the path should be authenticated
        const shouldAuthenticate = (
            options.include.some(includePath => req.path.startsWith(includePath)) &&
            !options.exclude?.some(excludePath => req.path.startsWith(excludePath))
        );

        // If authentication is not required, proceed to the next middleware
        if (!shouldAuthenticate) {
            return next();
        };
        
        // Extract the token from the Authorization header
        const token = req.header("Authorization")?.replace("Bearer ", "");
        
        // If no token is provided, respond with 401 Unauthorized
        if (!token) {
            return next(createHttpError.Forbidden("Forbidden"));
        };

        // Verify the token and attach the decoded user to the request object
        try {
            const decoded = Token.decryptToken(token, options.config.JWT_SECRET_KEY);
            (req as AuthRequest).user = decoded;
        } catch (error) {
            return next(createHttpError.Unauthorized("Missing or invalid credentials"))
        };
        
        return next();
    });
};

export default withAuth;
