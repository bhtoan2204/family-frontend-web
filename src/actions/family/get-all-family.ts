"use server";

import FamilyUrl from "@/services/url/family-url";

const getAllFamily = async (token: string) => {
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
    console.log(error.message)
    return { error: "Somwthing wrong!" };
  }
};

export default getAllFamily;
