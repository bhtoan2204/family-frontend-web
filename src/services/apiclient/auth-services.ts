import ERROR_TEXTS from "@/constants/error-texts";
import { AuthUrl } from "@/services/url";
import axios, { AxiosResponse } from "axios";

const AuthServices = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.login, {
        email,
        password,
      });

      const userData = response.data;

      if (response.status === 200) {
        return userData;
      } else {
        throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
      }
    } catch (error: any) {
      throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
    }
  },
  signup: async ({
    email,
    password,
    firstname,
    lastname,
    phone,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phone: string;
  }) => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.signup, {
        email,
        password,
        firstname,
        lastname,
        phone,
      });

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.SIGNUP_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.SIGNUP_ERROR);
    }
  },
  refreshToken: async () => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.refreshToken);
      const tokenData = response.data;
      if (response.statusText === "OK") {
        return {
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
        };
      } else {
        throw new Error(ERROR_TEXTS.RESPONSE_ERROR);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.API_ERROR);
    }
  },
  googleLogin: async () => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.googleLogin);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
    }
  },
  facebookLogin: async () => {
    try {
      const response: AxiosResponse = await axios.post(AuthUrl.facebookLogin);

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
      }
    } catch (error) {
      throw new Error(ERROR_TEXTS.USER_NOT_FOUND);
    }
  },
};

export default AuthServices;
