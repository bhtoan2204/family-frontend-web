"use server";

import FamilyUrl from "@/services/url/family-url";

const getFamilyDetail = async (token: string, familyId: string) => {
  try {
    const response = await fetch(`${FamilyUrl.getFamily}${familyId}`, {
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
};

export default getFamilyDetail;
