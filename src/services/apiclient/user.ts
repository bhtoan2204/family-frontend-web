import { UserProfile } from "@/redux/user/userProfile/type";
import UserUrl from "@/services/url/user-url";
import axios, { AxiosResponse } from "axios";
import instance from "../http-interceptor/axios-instance";
const UserService = {
  getUserProfile: async () => {
    try {
      const response = await instance.get(UserUrl.getUserProfile);
      return response.data.data as UserProfile;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error fetching user data");
    }
  },
  updateUserProfile: async (data: any) => {
    try {
      const response = await instance.put(UserUrl.updateUserProfile, data);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error updating user data");
    }
  },
  changePassword: async (data: any) => {
    try {
      const response = await instance.put(UserUrl.changePassword, data);
      return response.data;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error updating user data");
    }
  }
};
export default UserService;
