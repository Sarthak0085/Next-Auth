import * as z from "zod";

export const LoginSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" })
});

export const RegisterSchema = z.object({
    name: z.string()
        .min(1, { message: "Name is Required" }),
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" })
});

export const ResetSchema = z.object({
    email: z.string()
        .email({ message: "Please Enter a valid Email" }),
});

export const NewPasswordSchema = z.object({
    password: z.string()
        .min(8, { message: "Password must contains 8 characters" }),
});