import { baseUrl } from "@/services/url";

const GuideLineUrl = {
  getAllGuideline: `${baseUrl}/api/v1/guideline/getAllGuideline`,
  getGuidelineDetail: `${baseUrl}/api/v1/guideline/getGuideline`,
  createGuideline: `${baseUrl}/api/v1/guideline/createGuideline`,
  updateGuideline: `${baseUrl}/api/v1/guideline/updateGuideline`,
  deleteGuideline: `${baseUrl}/api/v1/guideline/deleteGuideline`,
  getStep: `${baseUrl}/api/v1/guideline/getStep`,
  addStep: `${baseUrl}/api/v1/guideline/addStep`,
  insertStep: `${baseUrl}/api/v1/guideline/insertStep`,
  updateStep: `${baseUrl}/api/v1/guideline/updateStep`,
  deleteStep: `${baseUrl}/api/v1/guideline/deleteStep`,
  markShared: `${baseUrl}/api/v1/guideline/markShared`,
  getSharedGuideline: `${baseUrl}/api/v1/guideline/getSharedGuideline`,
};

export default GuideLineUrl;
