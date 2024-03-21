import ERROR_TEXTS from "@/constants/error-texts";
import { AuthServices } from "@/services/apiclient";
import { baseUrl } from "@/services/url";
import LocalStorage from "@/store/local-storage";
import axios from "axios";

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(async (request) => {
  const accessToken = await LocalStorage.GetAccessToken();
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    if (error?.response?.status === 401) {
      config.sent = true;

      try {
        const { accessToken, refreshToken } = await AuthServices.refreshToken();

        if (accessToken && refreshToken) {
          LocalStorage.StoreAccessToken(accessToken);
          LocalStorage.StoreRefreshToken(refreshToken);

          const AccessToken = await LocalStorage.GetAccessToken();

          const newConfig = { ...config };
          newConfig.headers.Authorization = `Bearer ${AccessToken}`;

          return axios(newConfig);
        } else {
          LocalStorage.RemoveAccessToken();
          LocalStorage.RemoveRefreshToken();
          LocalStorage.RemoveUserData();
        }
      } catch (error) {
        LocalStorage.RemoveAccessToken();
        LocalStorage.RemoveRefreshToken();
        LocalStorage.RemoveUserData();
        throw new Error(ERROR_TEXTS.API_ERROR);
      }
    }
  }
);

export default instance;
