"use server";

import AuthUrl from "@/services/url/auth-url";
import { JWT } from "next-auth/jwt";

export const refreshToken = async (token: JWT) => {
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
