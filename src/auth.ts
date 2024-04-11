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
      console.log("session", token);

      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXT_PUBLIC_SECRET,
});
