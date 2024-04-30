"use server";

import SubjectUrl from "@/services/url/subject-url";

export const CreateSubject = async (
  token: string,
  educationProgressId: number,
  familyId: number,
  subjectName: string,
  description: string
) => {
  try {
    const response = await fetch(SubjectUrl.createSubject, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_education_progress: educationProgressId,
        id_family: familyId,
        subject_name: subjectName,
        description,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetSubjectDetail = async (
  token: string,
  subjectId: number,
  educationProgressId: string,
  familyId: number
) => {
  try {
    const response = await fetch(
      `${SubjectUrl.getSubjectDetail}?id_subject=${subjectId}&id_education_progress=${educationProgressId}&id_family=${familyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateSubject = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  subjectName: string,
  description: string
) => {
  try {
    const response = await fetch(SubjectUrl.updateSubject, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        subject_name: subjectName,
        description,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteSubject = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number
) => {
  try {
    const response = await fetch(
      `${SubjectUrl.deleteSubject}/${familyId}/${educationProgressId}/${subjectId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const AddComponentScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  componentName: string,
  score: number
) => {
  try {
    const response = await fetch(SubjectUrl.addComponentScore, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        component_name: componentName,
        score,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const InsertComponentScore = async (token: string, index: number) => {
  try {
    const response = await fetch(
      `${SubjectUrl.insertComponentScore}/${index}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateComponentScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  componentName: string,
  score: number
) => {
  try {
    const response = await fetch(SubjectUrl.updateComponentScore, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        component_name: componentName,
        score,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteComponentScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  index: number
) => {
  try {
    const response = await fetch(SubjectUrl.deleteComponentScore, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        index,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const ModifyScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  scoreName: string
) => {
  try {
    const response = await fetch(SubjectUrl.modifyScore, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        score_name: scoreName,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const RemoveScore = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  scoreName: string
) => {
  try {
    const response = await fetch(SubjectUrl.removeScore, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        score_name: scoreName,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const ChangeStatus = async (
  token: string,
  subjectId: number,
  educationProgressId: number,
  familyId: number,
  status: string
) => {
  try {
    const response = await fetch(SubjectUrl.changeStatus, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_subject: subjectId,
        id_education_progress: educationProgressId,
        id_family: familyId,
        status,
      }),
    });

    return response.json();
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
