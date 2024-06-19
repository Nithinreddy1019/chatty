import { WebSocketServer } from "ws";
import * as jwt from "jsonwebtoken";
import { prisma } from "../routes/user-auth"

export const setUpWebsocket = (wss: WebSocketServer): void => {

    const clients = new Map();

    wss.on('connection', async function connection(ws, req) {
        
        //authenticating user
        const cookies = req.headers.cookie;

        if(!cookies) {
            ws.close();
        };
        const tokenCookieString = cookies?.split(";").find(str => str.trim().startsWith("token="));

        if(!tokenCookieString){
            ws.close();
            return;
        };
        const token = tokenCookieString?.split("=")[1];

        if(token) {
            const tokenVerified = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
            if(!tokenVerified) ws.close();

            const userId = tokenVerified.userId;

            try {
                const user = await prisma.user.findUnique({
                    where: {
                        id: userId
                    }
                });

                (ws as any).userId = user?.id;
                (ws as any).username = user?.username;
            } catch (error) {
                ws.close();
                return;
            }
            
        };


        
        //notifying everyone about online people
        [...wss.clients].forEach(client => {
            client.send(JSON.stringify({
                online: [...wss.clients].map((c:any) => ({userId: c.userId, username: c.username}))
            }));
        });

        console.log('A new client Connected!');
        // ws.send('Welcome New Client!');
        

        ws.on('message', async function incoming(message: string) {
            const messageData = JSON.parse(message.toString());
            const { recepient, text, CreatedAt } = messageData;


            try {
                const newMessage = await prisma.message.create({
                    data: {
                        senderId: (ws as any).userId,
                        recepientId: recepient,
                        text: text,
                        CreatedAt
                    }
                });

                [...wss.clients].filter((c: any) => c.userId === recepient).forEach((c: any) => c.send(JSON.stringify({
                    sender: (ws as any).userId,
                    text: text,
                    CreatedAt: CreatedAt
                })))
                console.log(messageData);

            } catch (error) {
                return
            };

        
        });

        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client has disconnected');
        });

        
    });
};