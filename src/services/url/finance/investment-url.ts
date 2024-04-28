import {baseUrl} from "@/services/url";

const InvestmetURL = {
  getInvestment: `${baseUrl}/api/v1/finance/investment/getInvestment`,
  createInvestment: `${baseUrl}/api/v1/finance/investment/createInvestment`,
  updateInvestment: `${baseUrl}/api/v1/finance/investment/updateInvestment`,
  deleteInvestment: `${baseUrl}/api/v1/finance/investment/deleteInvestment`,
}

export default InvestmetURL