import { Request, Response, NextFunction } from "express";


export type IRoute = (
    req: Request, 
    res: Response, 
    next: NextFunction
) => Promise<any>;


export interface AuthRequest extends Request {
    user?: any;
};
