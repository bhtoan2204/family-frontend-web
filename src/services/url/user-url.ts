import { baseUrl } from "@/services/url";

const UserUrl = {
  getUserProfile: `${baseUrl}/api/v1/user/profile`,
  changePassword: `${baseUrl}/api/v1/user/changePassword`,
  forgotPassword: `${baseUrl}/api/v1/user/forgotPassword`,
  updateProfile: `${baseUrl}/api/v1/user/updateProfile`,
  changeAvatar: `${baseUrl}/api/v1/user/changeAvatar`,
  validateEmail: `${baseUrl}/api/v1/user/validateEmail`,
  getAllUsers: `${baseUrl}/api/v1/user/getAllUser`,
};

export default UserUrl;
