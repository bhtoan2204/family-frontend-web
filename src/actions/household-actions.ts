"use server";

import HouseholdUrl from "@/services/url/household-url";
import { HouseholdCategory, HouseholdItem } from "@/types/household";

export const GetHouseholdCategory = async (token: string) => {
  try {
    const response = await fetch(HouseholdUrl.getHouseholdCategory, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data as HouseholdCategory[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetHouseholdItem = async (
  token: string,
  familyId: number,
  page: string,
  itemsPerPage: string
) => {
  try {
    const response = await fetch(
      `${HouseholdUrl.getHouseholdItem}/${familyId}?page=${page}&itemsPerPage=${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data as HouseholdItem[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetHouseholdItemDetail = async (
  token: string,
  familyId: number,
  itemId: number
) => {
  try {
    const response = await fetch(
      `${HouseholdUrl.getHouseholdItemDetail}/${familyId}/${itemId}`,
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
export const CreateHouseholdItem = async (
  token: string,
  familyId: string,
  itemImage: string,
  itemName: string,
  categoryId: string,
  itemDescription: string,
  itemType: string
) => {
  try {
    const response = await fetch(HouseholdUrl.createHouseholdItem, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_family: familyId,
        item_image: itemImage,
        item_name: itemName,
        id_category: categoryId,
        item_description: itemDescription,
        item_type: itemType,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const UpdateHouseholdItem = async (
  token: string,
  familyId: string,
  itemImage: string,
  itemName: string,
  categoryId: string,
  itemDescription: string,
  itemId: string
) => {
  try {
    const response = await fetch(HouseholdUrl.updateHouseholdItem, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_family: familyId,
        item_image: itemImage,
        item_name: itemName,
        id_category: categoryId,
        item_description: itemDescription,
        item_id: itemId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const DeleteHouseholdItem = async (
  token: string,
  familyId: number,
  itemId: number
) => {
  try {
    const response = await fetch(
      `${HouseholdUrl.deleteHouseholdItem}/${familyId}/${itemId}`,
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
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const InputHouseholdDurableItem = async (
  token: string,
  familyId: number,
  itemId: number,
  condition: string
) => {
  try {
    const response = await fetch(HouseholdUrl.inputHouseholdDurableItem, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_family: familyId,
        item_id: itemId,
        condition: condition,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
export const IutputHouseholdConsumableItem = async (
  token: string,
  familyId: number,
  itemId: number,
  quantity: number,
  threshold: number,
  expiredDate: string
) => {
  try {
    const response = await fetch(HouseholdUrl.inputHouseholdConsumableItem, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_family: familyId,
        item_id: itemId,
        quantity: quantity,
        threshold: threshold,
        expired_date: expiredDate,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Internal Error!" };
  }
};
