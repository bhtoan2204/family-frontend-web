import { RefreshToken, SignOut } from "@/actions/auth-actions";
import { GetUserProfile } from "@/actions/user-actions";
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
      if (!token.accessToken) await SignOut();
      const userData = await GetUserProfile(token.accessToken);

      session.user.id = userData.id_user;
      session.user.email = userData.email;
      session.user.phone = userData.phone;
      session.user.firstname = userData.firstname;
      session.user.lastname = userData.lastname;
      session.user.avatar = userData.avatar;
      session.user.created_at = userData.created_at;
      session.user.updated_at = userData.updated_at;
      session.user.isEmailVerified = userData.isemailverified;
      session.user.isPhoneVerified = userData.isphoneverified;
      session.user.isAdmin = userData.isadmin as boolean;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpiresIn = token.accessTokenExpiresIn;
      session.refreshTokenExpiresIn = token.refreshTokenExpiresIn;

      return session;
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      const currentTime = Math.floor(new Date().getTime() / 1000);
      if (
        currentTime > token.refreshTokenExpiresIn ||
        token.refreshTokenExpiresIn === null
      )
        await SignOut();
      if (currentTime < token.accessTokenExpiresIn) return token;
      return await RefreshToken(token);
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  secret: process.env.NEXT_PUBLIC_SECRET,
});
