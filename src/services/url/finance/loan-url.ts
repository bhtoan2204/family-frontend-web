import { baseUrl } from "@/services/url";

const LoanUrl = {
  getLoan: `${baseUrl}/api/v1/finance/loan/getLoan`,
  createLoan: `${baseUrl}/api/v1/finance/loan/createLoan`,
  updateLoan: `${baseUrl}/api/v1/finance/loan/updateLoan`,
  deleteLoan: `${baseUrl}/api/v1/finance/loan/deleteLoan`,
};

export default LoanUrl;