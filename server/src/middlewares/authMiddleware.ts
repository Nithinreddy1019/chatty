import { NextFunction, Request, Response} from "express";
import * as jwt from "jsonwebtoken";


export interface RequestObject extends Request  {
    userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = async (req: RequestObject, res: Response, next: NextFunction) => {

    const token = req.cookies["token"];

    if(!token) {
        return res.status(403).json({
            error: "Token not found"
        });
    };

    
    try {
        const verifiedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;  
        req.userId = verifiedToken.userId;
    next();  
    } catch (error) {
        return res.status(403).json({
            error: "Forbidden"
        });
    };

    
};