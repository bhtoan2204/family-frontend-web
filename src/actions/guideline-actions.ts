"use server";

import GuideLineUrl from "@/services/url/guideline-url";
import { GuidelineItemDetail, GuidelineItemInList } from "@/types/guideline";

export const GetAllGuideline = async (
  token: string,
  familyId: number,
  page: number,
  itemsPerPage: number
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.getAllGuideline}/${familyId}?page=${page}&itemsPerPage=${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return {
      guidelines: data.data.items as GuidelineItemInList[],
      total: data.data.total as number,
    };
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetGuidelineDetail = async (
  token: string,
  familyId: number,
  guidelineId: number
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.getGuidelineDetail}/${familyId}/${guidelineId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.message == "Success") {
      return data.data[0] as GuidelineItemDetail;
    } else {
      throw new Error("Internal Error!");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Internal Error!");
  }
};
export const CreateGuideline = async (
  token: string,
  familyId: number,
  guideline: any
) => {
  try {
    console.log(token, familyId, guideline);
    const response = await fetch(`${GuideLineUrl.createGuideline}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_family: familyId,
        ...guideline,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const UpdateGuideline = async (
  token: string,
  familyId: number,
  guidelineId: number,
  guideline: any
) => {
  try {
    const response = await fetch(`${GuideLineUrl.updateGuideline}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_family: familyId,
        id_guideline: guidelineId,
        ...guideline,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const DeleteGuideline = async (
  token: string,
  familyId: number,
  guidelineId: number
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.deleteGuideline}/${familyId}/${guidelineId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetStep = async (
  token: string,
  familyId: number,
  guidelineId: number
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.getStep}/${familyId}/${guidelineId}`,
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
    throw new Error("Internal Error!");
  }
};
export const AddStep = async (
  token: string,
  familyId: number,
  guidelineId: number,
  stepImage: string | null,
  name: string,
  description: string
) => {
  try {
    const response = await fetch(`${GuideLineUrl.addStep}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_family: familyId,
        id_guideline: guidelineId,
        stepImage,
        name,
        description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const InsertStep = async (
  token: string,
  familyId: number,
  guidelineId: number,
  stepImage: string | null,
  name: string,
  description: string,
  index: string
) => {
  try {
    const response = await fetch(`${GuideLineUrl.insertStep}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_family: familyId,
        id_guideline: guidelineId,
        stepImage,
        name,
        description,
        index,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const UpdateStep = async (
  token: string,
  familyId: number,
  guidelineId: number,
  index: string,
  stepImage: string | null,
  name: string,
  description: string
) => {
  console.log(
    token,
    familyId,
    guidelineId,
    index,
    stepImage,
    name,
    description
  );
  try {
    const response = await fetch(`${GuideLineUrl.updateStep}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_family: familyId,
        id_guideline: guidelineId,
        index,
        stepImage,
        name,
        description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const DeleteStep = async (
  token: string,
  familyId: number,
  guidelineId: number,
  index: number
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.deleteStep}/${familyId}/${guidelineId}/${index}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const MarkShared = async (
  token: string,
  familyId: number,
  guidelineId: number
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.markShared}/${familyId}/${guidelineId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
export const GetSharedGuideline = async (
  token: string,
  page: string,
  itemsPerPage: string,
  text: string
) => {
  try {
    const response = await fetch(
      `${GuideLineUrl.getSharedGuideline}?page=${page}&itemsPerPage=${itemsPerPage}&text=${text}`,
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
    throw new Error("Internal Error!");
  }
};
