import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}));


app.listen(3000, () => {
    console.log(`Listening on PORT - ${port}`);
});