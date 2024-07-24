"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import sendEmail from "@/lib/send-mail";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  console.log(values);
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  console.log(existingUser, password);

  if (!existingUser || !existingUser?.email || !existingUser?.password) {
    return { error: "User doesn't exist!" }
  }

  const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordMatch) {
    return {
      error: "Invalid Credentials"
    }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);

    const confirmLink = `http://localhost:3000/auth/verification?token=${verificationToken.token}`

    await sendEmail({
      email: email,
      subject: "Confirm your Email",
      html: `<p>Please click <a href="${confirmLink}">here</a> to confirm your Email.</p>`
    })

    return {
      success: "Confirmation Email Sent!"
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error?.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something Went Wrong" };
      }
    }

    throw error;
  }
};
