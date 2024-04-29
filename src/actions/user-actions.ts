"use server";

import { ChangePasswordSchema } from "@/schemas/auth-schema";
import UserUrl from "@/services/url/user-url";
import * as z from "zod";

const UserActions = {
  GetUserProfile: async (token: string) => {
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
      return { error: "Something wrong!" };
    }
  },
  ChangePassword: async (
    token: string,
    data: z.infer<typeof ChangePasswordSchema>
  ) => {
    const validatedFields = ChangePasswordSchema.safeParse(data);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }
    const { oldPassword, newPassword, confirmPassword } = validatedFields.data;

    try {
      await fetch(UserUrl.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        }),
      });
    } catch (error: any) {
      return { error: "Something wrong!" };
    }
  },
  ForgotPassword: async (email: string) => {
    try {
      await fetch(UserUrl.forgotPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });
    } catch (error: any) {
      return { error: "Something wrong!" };
    }
  },
  UpdateProfile: async (token: string, data: any) => {
    try {
      await fetch(UserUrl.updateProfile, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      return { error: "Something wrong!" };
    }
  },
  ChangeAvatar: async (token: string, data: any) => {
    try {
      await fetch(UserUrl.changeAvatar, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      return { error: "Something wrong!" };
    }
  },
  ValidateEmail: async (token: string, data: any) => {
    try {
      await fetch(UserUrl.validateEmail, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
    } catch (error: any) {
      return { error: "Something wrong!" };
    }
  },
  GetAllUsers: async (token: string) => {
    try {
      const response = await fetch(UserUrl.getAllUsers, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data.data;
    } catch (error: any) {
      return { error: "Something wrong!" };
    }
  },
};

export { UserActions };
