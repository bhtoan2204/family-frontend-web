"use server";

import GuideLineUrl from "@/services/url/guideline-url";

const GuidelineActions = {
  GetAllGuideline: async (
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
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  GetGuidelineDetail: async (
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
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  CreateGuideline: async (token: string, familyId: number, guideline: any) => {
    try {
      const response = await fetch(`${GuideLineUrl.createGuideline}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_family: familyId,
          guideline,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  UpdateGuideline: async (
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
          guideline,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  DeleteGuideline: async (
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
      return { error: "Something wrong!" };
    }
  },
  GetStep: async (token: string, familyId: number, guidelineId: number) => {
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
      return { error: "Something wrong!" };
    }
  },
  AddStep: async (
    token: string,
    familyId: number,
    guidelineId: number,
    stepImage: string,
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
      return { error: "Something wrong!" };
    }
  },
  InsetStep: async (
    token: string,
    familyId: number,
    guidelineId: number,
    stepImage: string,
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
      return { error: "Something wrong!" };
    }
  },
  UpdateStep: async (
    token: string,
    familyId: number,
    guidelineId: number,
    index: string,
    stepImage: string,
    name: string,
    description: string
  ) => {
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
      return { error: "Something wrong!" };
    }
  },
  DeleteStep: async (
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
      return { error: "Something wrong!" };
    }
  },
  MarkShared: async (token: string, familyId: number, guidelineId: number) => {
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
      return { error: "Something wrong!" };
    }
  },
  GetSharedGuideline: async (
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
      return { error: "Something wrong!" };
    }
  },
};

export { GuidelineActions };
