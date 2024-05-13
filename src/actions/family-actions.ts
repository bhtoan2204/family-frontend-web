"use server";

import { FamilySchema } from "@/schemas";
import FamilyUrl from "@/services/url/family-url";
import { Family } from "@/types/family";
import { FamilyWithMembers } from "@/types/family-with-members";
import { Member } from "@/types/member";
import * as z from "zod";

export const GetAllFamilies = async (token: string) => {
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
    return { error: "Internal Error!" };
  }
};
export const GetFamilyDetail = async (token: string, familyId: string) => {
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
    return data[0] as Family;
  } catch (error: any) {
    throw new Error("Internal Error!");
  }
};
export const CreateFamily = async (
  token: string,
  family: z.infer<typeof FamilySchema>
) => {
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
    return { error: "Internal Error!" };
  }
};
export const UpdateFamily = async (
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
    throw new Error("Internal Error!");
  }
};
export const DeleteFamily = async (token: string, familyId: number) => {
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
    return { error: "Internal Error!" };
  }
};
export const GetAllMember = async (token: string, familyId: string) => {
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
    return data as Member[];
  } catch (error: any) {
    throw new Error("Internal Error!");
  }
};
export const GetMemberDetail = async (token: string, memberId: string) => {
  try {
    const response = await fetch(`${FamilyUrl.getMember}?id_user=${memberId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data[0] as Member;
  } catch (error: any) {
    throw new Error("Internal Error!");
  }
};
export const AddMember = async (
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
    return { error: "Internal Error!" };
  }
};
export const DeleteMember = async (
  token: string,
  memberId: string,
  familyId: number
) => {
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
    return { error: "Internal Error!" };
  }
};
export const ChangeAvatar = async (
  token: string,
  familyId: number,
  avatar: string
) => {
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
    return { error: "Internal Error!" };
  }
};
export const GetFamilyWithMember = async (
  token: string,
  userId: string,
  familyId: string
) => {
  try {
    const response = await GetFamilyDetail(token, familyId);
    const family = response;

    const members: Member[] = await GetAllMember(token, familyId);

    const familyWithMember = {
      ...family,
      members: members,
    } as FamilyWithMembers;

    return familyWithMember;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const CheckIfUserIsInFamily = async (
  token: string,
  userId: string,
  familyId: string
) => {
  try {
    const response = await GetAllMember(token, familyId);
    const members = response;

    const isUserInFamily = members.some((member) => member.id_user === userId);

    return isUserInFamily;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
