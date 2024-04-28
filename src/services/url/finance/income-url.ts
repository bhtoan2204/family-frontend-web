import { baseUrl } from "@/services/url";

const IncomeUrl = {
  getIncome: `${baseUrl}/api/v1/finance/income/getIncome`,
  createIncome: `${baseUrl}/api/v1/finance/income/createIncome`,
  updateIncome: `${baseUrl}/api/v1/finance/income/updateIncome`,
  deleteIncome: `${baseUrl}/api/v1/finance/income/deleteIncome`,
};

export default IncomeUrl;
