import { baseUrl } from "@/services/url";

const SavingUrl = {
  getSaving: `${baseUrl}/api/v1/finance/saving/getSaving`,
  createSaving: `${baseUrl}/api/v1/finance/saving/createSaving`,
  updateSaving: `${baseUrl}/api/v1/finance/saving/updateSaving`,
  deleteSaving: `${baseUrl}/api/v1/finance/saving/deleteSaving`,
};

export default SavingUrl;