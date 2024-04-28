"use server";

import UserUrl from "@/services/url/user-url";

const getUserProfile = async (token: string) => {
  try {
    const response = await fetch(UserUrl.getUserProfile, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    if (data.message === "ok") {
      return data.data;
    } else {
      return { error: data.message };
    }
  } catch (error: any) {
    return { error: "Some thing wrong!" };
  }
};

export default getUserProfile;
