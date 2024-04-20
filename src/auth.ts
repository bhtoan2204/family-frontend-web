import { refreshToken } from "@/actions/auth/refresh-token";
import authConfig from "@/auth.config";
import NextAuth from "next-auth";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpiresIn = token.accessTokenExpiresIn;
      session.refreshTokenExpiresIn = token.refreshTokenExpiresIn;

      return session;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (currentTime < token.accessTokenExpiresIn) return token;
      return await refreshToken(token);
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXT_PUBLIC_SECRET,
});
