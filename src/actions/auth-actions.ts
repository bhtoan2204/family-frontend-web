"use server";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema, SignupSchema } from "@/schemas";
import { AuthUrl } from "@/services/url";
import { AuthError } from "next-auth";
import { JWT } from "next-auth/jwt";
import * as z from "zod";

export const SignIn = async (data: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password } = validatedFields.data;

  try {
    const res=await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    }).then(() => {
      return { success: "Logged in" };
    }).catch(() => {
      return { error: "Invalid credentials!" };
    });
    return res;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        case "AccessDenied":
          return { error: "Access denied!" };
        case "EventError":
          return { error: "Event error!" };
        default:
          return { error: "Invalid credentials!" };
      }
    }
    throw error;
  }
};
export const SignUp = async (data: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, firstName, lastName, phone } = validatedFields.data;

  try {
    await fetch(AuthUrl.signup, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        phone: phone,
      }),
    });
    return { success: "Logged in" };
  } catch (error) {
    return { error: "Invalid credentials!" };
  }
};
export const RefreshToken = async (token: JWT) => {
  try {
    const res = await fetch(AuthUrl.refreshToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token.refreshToken}`,
      },
    });
    const response = await res.json();
    token.accessToken = response.accessToken;
    token.refreshToken = response.refreshToken;
    token.accessTokenExpiresIn = response.accessTokenExpiresIn;
    token.refreshTokenExpiresIn = response.refreshTokenExpiresIn;

    return token;
  } catch (error) {
    return token;
  }
};
export const SignOut = async () => {
  await signOut();
};
