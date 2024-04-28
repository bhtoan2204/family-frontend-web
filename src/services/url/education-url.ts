import { baseUrl } from "@/services/url";

const EducationUrl = {
  getAllEducation: `${baseUrl}/api/v1/education/getAll`,
  getEducationDetail: `${baseUrl}/api/v1/education/getDetail`,
  createEducation: `${baseUrl}/api/v1/education/create`,
  updateEducation: `${baseUrl}/api/v1/education/update`,
  deleteEducation: `${baseUrl}/api/v1/education/delete`,
};

export default EducationUrl;
