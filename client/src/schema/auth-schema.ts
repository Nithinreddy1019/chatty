import * as z from "zod";


export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please provide email"
    }),
    username: z.string({
        message: "username cannot be empty"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 charaters required"
    })
});


export const LoginSchema = z.object({
    email: z.string().email({
        message: "Please provide the email"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    })
});