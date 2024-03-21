import { UserProfile } from "@/redux/user/userProfile/type";
import UserUrl from "@/services/url/user-url";
import axios, { AxiosResponse } from "axios";
const UserService = {
  getUserProfile: async (accessToken: String) => {
    console.log("cout<<", UserUrl.getUserProfile, accessToken);
    try {
      const response = await axios.get(UserUrl.getUserProfile, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data.data as UserProfile;
    } catch (error: any) {
      console.log(error.message);
      throw new Error("Error fetching user data");
    }
  },
};
export default UserService;
