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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const schema_1 = require("../schema");
const client_1 = require("@prisma/client");
exports.userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const JwtSecret = process.env.JWT_SECRET;
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
        const emailExists = yield prisma.user.findUnique({
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
        const user = yield prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, JwtSecret);
        return res.cookie("token", token).status(200).json({
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
        const userExists = yield prisma.user.findUnique({
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
        return res.cookie("token", token).status(200).json({
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
