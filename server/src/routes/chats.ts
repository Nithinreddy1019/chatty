import express, { Response } from "express";
import { prisma } from "./user-auth";
import { RequestObject, authMiddleware } from "../middlewares/authMiddleware";



export const chat_router = express();


chat_router.post("/chat", authMiddleware, async (req: RequestObject, res: Response) => {

    const userId = req.userId;

    const { selectedContact } = req.body;

    if(!selectedContact) {
        return res.status(401).json({
            error: "no id present"
        });
    };

    try {
        const selectedContactUser = await prisma.user.findUnique({
            where: {
                id: selectedContact
            }
        });

        if(selectedContactUser) {
            return res.status(200).json({
                contact: {
                    id: selectedContactUser.id,
                    username: selectedContactUser.username,
                    email: selectedContactUser.email
                }
            });
        };
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    };
});


chat_router.post("/getChats", authMiddleware, async (req:RequestObject, res) => {

    const userId = req.userId;
    const { selectedContact } = req.body;

    if(!selectedContact) {
        return res.status(401).json({
            error: "no id present"
        });
    };


    try {
        const messages = await prisma.message.findMany({
            where: {
                senderId: {
                    in: [userId, selectedContact]
                },
                recepientId: {
                    in: [userId, selectedContact]
                }
            },
            select: {
                senderId: true,
                recepientId: true,
                text: true,
                CreatedAt: true
            },
            orderBy: {
                CreatedAt: "asc"
            }
        });
    
        return res.status(200).json(messages);
    } catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    };


});
