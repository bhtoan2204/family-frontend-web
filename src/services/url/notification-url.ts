import { baseUrl } from "@/services/url";

const NotificationUrl = {
  getNotifications: `${baseUrl}/api/v1/notification/getNotifications`,
  markAsRead: `${baseUrl}/api/v1/notification/markRead`,
};

export default NotificationUrl;
