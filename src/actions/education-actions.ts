"use server";

import EducationUrl from "@/services/url/education-url";

const EducationActions = {
  GetAllEducation: async (
    token: string,
    familyId: number,
    page: string,
    itemsPerPage: string
  ) => {
    try {
      const response = await fetch(
        `${EducationUrl.getAllEducation}?id_family=${familyId}&page=${page}&itemsPerPage=${itemsPerPage}`,
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
  GetEducationDetail: async (
    token: string,
    familyId: number,
    educationProgressId: number
  ) => {
    try {
      const response = await fetch(
        `${EducationUrl.getEducationDetail}/${familyId}/${educationProgressId}`,
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
  CreateEducation: async (
    token: string,
    familyId: number,
    userId: string,
    title: string,
    progressNotes: string,
    schoolInfo: string
  ) => {
    try {
      const response = await fetch(EducationUrl.createEducation, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_family: familyId,
          id_user: userId,
          title: title,
          progress_notes: progressNotes,
          school_info: schoolInfo,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  UpdateEducation: async (
    token: string,
    educationProgressId: number,
    familyId: number,
    title: string,
    progressNotes: string,
    schoolInfo: string
  ) => {
    try {
      const response = await fetch(EducationUrl.updateEducation, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_education_progress: educationProgressId,
          id_family: familyId,
          title: title,
          progress_notes: progressNotes,
          school_info: schoolInfo,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      return { error: "Something wrong!" };
    }
  },
  DeleteEducation: async (
    token: string,
    educationProgressId: number,
    familyId: number
  ) => {
    try {
      const response = await fetch(
        `${EducationUrl.deleteEducation}/${educationProgressId}/${familyId}`,
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
      return { error: "Something wrong!" };
    }
  },
};

export { EducationActions };
