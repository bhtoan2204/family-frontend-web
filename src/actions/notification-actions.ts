"use server";

import NotificationUrl from "@/services/url/notification-url";

export const GetNotifications = async (token: string, index: number) => {
  try {
    const response = await fetch(
      `${NotificationUrl.getNotifications}/${index}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const MarkAsRead = async (token: string, notificationId: number) => {
  try {
    const response = await fetch(
      `${NotificationUrl.markAsRead}/${notificationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
