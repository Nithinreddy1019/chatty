import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { userRouter } from "./routes/user-auth";

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

app.get("/", async (req, res) => {
    return res.json({msg: "test OK"})
});

app.listen(3000, () => {
    console.log(`Listening on PORT - ${port}`);
});