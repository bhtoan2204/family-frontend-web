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
      firstname: string;
      lastname: string;
      avatar: string;
      created_at: string;
      updated_at: string;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      isAdmin: boolean;
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
      id: string;
      email: string;
      phone: string;
      firstname: string;
      lastname: string;
      avatar: string;
      created_at: string;
      updated_at: string;
      isEmailVerified: boolean;
      isPhoneVerified: boolean;
      isAdmin: boolean;
    };
  }
}
