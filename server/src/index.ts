import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import http from "http";
import ws from "ws";

import { userRouter } from "./routes/user-auth";
import { setUpWebsocket } from "./routes/socket";
import { chat_router } from "./routes/chats";

const port = 3000;
const app = express();


app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use(cookieParser());
dotenv.config();



app.use("/app/v1", userRouter);
app.use("/app/v1", chat_router);

app.get("/", async (req, res) => {
    return res.json({msg: "test OK"})
});

const server = app.listen(3000, () => {
    console.log(`Listening on PORT - ${port}`);
});

const wss = new ws.WebSocketServer({ server });
setUpWebsocket(wss);