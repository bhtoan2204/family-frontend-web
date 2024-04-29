"use server";

import { FamilySchema } from "@/schemas/family-schema";
import FamilyUrl from "@/services/url/family-url";
import * as z from "zod";

const FamilyActions = {
  GetAllFamilies: async (token: string) => {
    try {
      const response = await fetch(FamilyUrl.getAllFamily, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  GetFamilyDetail: async (token: string, familyId: string) => {
    try {
      const response = await fetch(
        `${FamilyUrl.getFamily}?id_family=${familyId}`,
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
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  CreateFamily: async (token: string, family: z.infer<typeof FamilySchema>) => {
    const validatedFields = FamilySchema.safeParse(family);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { name, description } = validatedFields.data;

    try {
      const response = await fetch(FamilyUrl.createFamily, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: name,
          description: description,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  UpdateFamily: async (
    token: string,
    family: z.infer<typeof FamilySchema>,
    familyId: number
  ) => {
    const validatedFields = FamilySchema.safeParse(family);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { name, description } = validatedFields.data;

    try {
      const response = await fetch(FamilyUrl.updateFamily, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_family: familyId,
          name: name,
          description: description,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  DeleteFamily: async (token: string, familyId: number) => {
    try {
      const response = await fetch(
        `${FamilyUrl.deleteFamily}?id_family=${familyId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  GetAllMember: async (token: string, familyId: number) => {
    try {
      const response = await fetch(
        `${FamilyUrl.getAllMember}?id_family=${familyId}`,
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
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  GetMemberDetail: async (token: string, memberId: string) => {
    try {
      const response = await fetch(
        `${FamilyUrl.getMember}?id_user=${memberId}`,
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
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  AddMember: async (
    token: string,
    familyId: number,
    email: string,
    phone: string
  ) => {
    try {
      const response = await fetch(FamilyUrl.addMember, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_family: familyId,
          gmail: email,
          phone: phone,
          role: "Member",
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  DeleteMember: async (token: string, memberId: string, familyId: number) => {
    try {
      const response = await fetch(FamilyUrl.deleteMember, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: memberId,
          id_family: familyId,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
  ChangeAvatar: async (token: string, familyId: number, avatar: string) => {
    try {
      const response = await fetch(FamilyUrl.changeAvatar, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_family: familyId,
          avatar: avatar,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
      return { error: "Something wrong!" };
    }
  },
};

export { FamilyActions };
