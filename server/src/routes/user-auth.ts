import express from "express";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";

import { loginSchema, signupSchema } from "../schema";
import { PrismaClient } from "@prisma/client";


export const userRouter = express.Router();

const prisma = new PrismaClient();
const JwtSecret = process.env.JWT_SECRET as string;

userRouter.post("/profile", async (req, res) => {
    const token = req.cookies["token"];

    if(!token){
        return res.status(403).json({
            error: "token not found"
        });
    };

    const verifiedToken = jwt.verify(token, JwtSecret) as JwtPayload;

    if(!verifiedToken) {
        return res.status(403).json({
            error: "Forbidden"
        });
    };
    

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: verifiedToken.userId
            }
        });

        return res.status(200).json({
            user: {
                email: user?.email,
                username: user?.username
            }
        });
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });  
    };


});

userRouter.post('/signup', async (req, res) => {
    
    const validatedFields = signupSchema.safeParse(req.body);

    if(!validatedFields.success) {
        return res.status(401).json({
            error: "Invalid credentials"
        })
    };

    const { email, username, password } = validatedFields.data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        
        const emailExists = await prisma.user.findUnique({
            where: {
                email: email
            }
        });

        if(emailExists) {
            return res.status(403).json({
                error: "Email already exists"
            });
        };

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });

        const token = jwt.sign({userId: user.id}, JwtSecret);
        return res.cookie("token", token, {sameSite: "none", httpOnly: false, secure: true, maxAge: 24*60*60*100}).status(200).json({
            message: "User successfully created"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    };

});


userRouter.post("/login", async (req, res) => {
    const validatedFields = loginSchema.safeParse(req.body);

    if(!validatedFields.success) {
        return res.status(401).json({
            error: "Invalid credentials"
        })
    };

    const { email, password } = validatedFields.data;

    try {
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!userExists) {
            return res.status(403).json({
                error: "Email not found"
            });
        };

        const passwordMatches = await bcrypt.compare(password, userExists.password);

        if(!passwordMatches) {
            return res.status(401).json({
                error: "Invalid password"
            });
        };

        const token = jwt.sign({userId: userExists.id}, JwtSecret);

        return res.cookie("token", token, {sameSite: "none", httpOnly: false, secure: true, maxAge: 24*60*60*100}).status(200).json({
            message: "Login successfull"
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    };

});