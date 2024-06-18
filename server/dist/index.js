"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const ws_1 = __importDefault(require("ws"));
const user_auth_1 = require("./routes/user-auth");
const socket_1 = require("./routes/socket");
const chats_1 = require("./routes/chats");
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: "http://localhost:5173"
}));
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
app.use("/app/v1", user_auth_1.userRouter);
app.use("/app/v1", chats_1.chat_router);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json({ msg: "test OK" });
}));
const server = app.listen(3000, () => {
    console.log(`Listening on PORT - ${port}`);
});
const wss = new ws_1.default.WebSocketServer({ server });
(0, socket_1.setUpWebsocket)(wss);
