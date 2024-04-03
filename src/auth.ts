import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import LocalStorage from "./store/local-storage";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) {
      console.log("session", session, token)
      return session;
    },
    async jwt({ token }) {
      console.log("jwt", token);
      token.accessToken = LocalStorage.GetAccessToken();
      token.refreshToken = LocalStorage.GetRefreshToken();
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXT_PUBLIC_SECRET,
});
