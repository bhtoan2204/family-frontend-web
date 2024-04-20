import { baseUrl } from "@/services/url";

const AuthUrl = {
  signin: `${baseUrl}/api/v1/auth/local/login`,
  signup: `${baseUrl}/api/v1/user/register/createAccountForTest`,
  googleLogin: `${baseUrl}/api/v1/auth/google/login`,
  googleCallback: `${baseUrl}/api/v1/auth/google/callback`,
  facebookLogin: `${baseUrl}/api/v1/auth/facebook/login`,
  facebookCallback: `${baseUrl}/api/v1/auth/facebook/callback`,
  refreshToken: `${baseUrl}/api/v1/auth/refresh`,
};

export default AuthUrl;
