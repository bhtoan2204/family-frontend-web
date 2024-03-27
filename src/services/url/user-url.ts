import { baseUrl } from "@/services/url";

const UserUrl = {
  getUserProfile: `${baseUrl}/api/v1/user/profile`,
  updateUserProfile: `${baseUrl}/api/v1/user/updateProfile`,
  changePassword: `${baseUrl}/api/v1/user/changePassword`,
};

export default UserUrl;
