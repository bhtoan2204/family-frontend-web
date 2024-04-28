import { baseUrl } from "@/services/url";

const SubjectUrl = {
  createSubject: `${baseUrl}/api/v1/subject/create`,
  getSubjectDetail: `${baseUrl}/api/v1/subject/getDetail`,
  updateSubject: `${baseUrl}/api/v1/subject/update`,
  deleteSubject: `${baseUrl}/api/v1/subject/delete`,
  addComponentScore: `${baseUrl}/api/v1/subject/addComponentScore`,
  insertComponentScore: `${baseUrl}/api/v1/subject/insertComponentScore`,
  updateComponentScore: `${baseUrl}/api/v1/subject/updateComponentScore`,
  deleteComponentScore: `${baseUrl}/api/v1/subject/deleteComponentScore`,
  modifyScore: `${baseUrl}/api/v1/subject/modifyScore`,
  removeScore: `${baseUrl}/api/v1/subject/removeScore`,
  changeStatus: `${baseUrl}/api/v1/subject/changeStatus`,
};

export default SubjectUrl;
