import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    user: {
      id: string;
      email: string;
      phone: string;
      language: string;
      twofa: boolean;
      createdAt: string;
      updatedAt: string;
      isPhoneVerified: boolean;
      isAdmin: boolean;
      firstname: string;
      lastname: string;
      isEmailVerified: boolean;
      avatar: string;
      loginType: string;
      birthdate: string | null;
      genre: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
    user: {
      id_user: string;
      email: string;
      phone: string;
      language: string;
      twofa: boolean;
      created_at: string;
      updated_at: string;
      isphoneverified: boolean;
      isadmin: boolean;
      firstname: string;
      lastname: string;
      isemailverified: boolean;
      avatar: string;
      login_type: string;
      birthdate: string | null;
      genre: string | null;
    };
  }
}
