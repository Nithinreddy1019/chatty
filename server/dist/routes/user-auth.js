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
exports.prisma = exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("../schema");
const client_1 = require("@prisma/client");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.userRouter = express_1.default.Router();
exports.prisma = new client_1.PrismaClient();
const JwtSecret = process.env.JWT_SECRET;
exports.userRouter.post("/profile", authMiddleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies["token"];
    try {
        const user = yield exports.prisma.user.findUnique({
            where: {
                id: req.userId
            }
        });
        return res.status(200).json({
            user: {
                email: user === null || user === void 0 ? void 0 : user.email,
                username: user === null || user === void 0 ? void 0 : user.username,
                userId: user === null || user === void 0 ? void 0 : user.id
            }
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
    ;
}));
exports.userRouter.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedFields = schema_1.signupSchema.safeParse(req.body);
    if (!validatedFields.success) {
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }
    ;
    const { email, username, password } = validatedFields.data;
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    try {
        const emailExists = yield exports.prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (emailExists) {
            return res.status(403).json({
                error: "Email already exists"
            });
        }
        ;
        const user = yield exports.prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JwtSecret);
        return res.cookie("token", token, { sameSite: "none", httpOnly: false, secure: true, maxAge: 24 * 60 * 60 * 100 }).status(200).json({
            message: "User successfully created"
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
    ;
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validatedFields = schema_1.loginSchema.safeParse(req.body);
    if (!validatedFields.success) {
        return res.status(401).json({
            error: "Invalid credentials"
        });
    }
    ;
    const { email, password } = validatedFields.data;
    try {
        const userExists = yield exports.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!userExists) {
            return res.status(403).json({
                error: "Email not found"
            });
        }
        ;
        const passwordMatches = yield bcryptjs_1.default.compare(password, userExists.password);
        if (!passwordMatches) {
            return res.status(401).json({
                error: "Invalid password"
            });
        }
        ;
        const token = jsonwebtoken_1.default.sign({ userId: userExists.id }, JwtSecret);
        return res.cookie("token", token, { sameSite: "none", httpOnly: false, secure: true, maxAge: 24 * 60 * 60 * 100 }).status(200).json({
            message: "Login successfull"
        });
    }
    catch (error) {
        return res.status(500).json({
            error: "Internal server error"
        });
    }
    ;
}));
