import { WebSocketServer } from "ws"

export const setUpWebsocket = (wss: WebSocketServer): void => {
    wss.on('connection', function connection(ws) {
        console.log('A new client Connected!');
        ws.send('Welcome New Client!');

        ws.on('message', function incoming(message: string) {
            console.log('received: %s', message);
        });

        ws.on('close', () => {
            console.log('Client has disconnected');
        });
    });
};