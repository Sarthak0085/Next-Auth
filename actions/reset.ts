"use server";

import { getUserByEmail } from "@/data/user";
import sendEmail from "@/lib/send-mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if (!validatedFields.success) {
        return {
            error: "Invalid Fields"
        }
    }

    const { email } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return {
            error: "User doesn't exist with this email"
        }
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    if (!passwordResetToken) {
        return {
            error: "Error while generating token"
        }
    }

    const confirmLink = `http://localhost:3000/auth/new-password?token=${passwordResetToken.token}`

    await sendEmail({
        email: email,
        subject: "Confirm your Email",
        html: `<p>Please click <a href="${confirmLink}">here</a> to reset your password.</p>`
    });

    return {
        success: "Reset Email Sent!"
    }
}