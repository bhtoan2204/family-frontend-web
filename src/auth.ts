import { RefreshToken, SignOut } from "@/actions/auth-actions";
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

      session.user.id = token.user.id_user;
      session.user.email = token.user.email;
      session.user.phone = token.user.phone;
      session.user.language = token.user.language;
      session.user.twofa = token.user.twofa;
      session.user.createdAt = token.user.created_at;
      session.user.updatedAt = token.user.updated_at;
      session.user.isPhoneVerified = token.user.isphoneverified;
      session.user.isAdmin = token.user.isadmin;
      session.user.firstname = token.user.firstname;
      session.user.lastname = token.user.lastname;
      session.user.isEmailVerified = token.user.isemailverified;
      session.user.avatar = token.user.avatar;
      session.user.loginType = token.user.login_type;
      session.user.birthdate = token.user.birthdate;
      session.user.genre = token.user.genre;

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
