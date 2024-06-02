import * as z from "zod";

export const signupSchema = z.object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6)
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});