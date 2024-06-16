import { WebSocketServer } from "ws";
import * as jwt from "jsonwebtoken";

export const setUpWebsocket = (wss: WebSocketServer): void => {

    const clients = new Map();

    wss.on('connection', function connection(ws, req) {
        
        const cookies = req.headers.cookie;
        if(!cookies) {
            ws.close();
        };

        const tokenCookieString = cookies?.split(";").find(str => str.startsWith("token="));

        if(!tokenCookieString) ws.close();

        const token = tokenCookieString?.split("=")[1];

        if(token) {
            const tokenVerified = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
            if(!tokenVerified) ws.close();

            const userId = tokenVerified.userId;
            (ws as any).userId = userId;
            
        };
        

        console.log([...wss.clients])

        console.log('A new client Connected!');
        ws.send('Welcome New Client!');
        

        ws.on('message', function incoming(message: string) {
            console.log('received: %s', message);
        });

        ws.on('close', () => {
            clients.delete(ws);
            console.log('Client has disconnected');
        });

        
    });
};