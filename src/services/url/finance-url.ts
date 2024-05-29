import { baseUrl } from "@/services/url";

const FinanceUrl = {
  getFinanceSummary: `${baseUrl}/api/v1/finance/getSummary`,
};

const AssetUrl = {
  getAssets: `${baseUrl}/api/v1/finance/asset/getAssets`,
  getAsset: `${baseUrl}/api/v1/finance/asset/getAsset`,
  createAsset: `${baseUrl}/api/v1/finance/asset/createAsset`,
  updateAsset: `${baseUrl}/api/v1/finance/asset/updateAsset`,
  deleteAsset: `${baseUrl}/api/v1/finance/asset/deleteAsset`,
};

const ExpenseditureUrl = {
  getExpenseditures: `${baseUrl}/api/v1/finance/expenseditureType/getExpenseType`,
  getExpensediture: `${baseUrl}/api/v1/finance/expensediture/getExpense`,
  createExpenseType: `${baseUrl}/api/v1/finance/expenseditureType/createExpenseType`,
  createExpensediture: `${baseUrl}/api/v1/finance/expensediture/createExpense`,
  updateExpensediture: `${baseUrl}/api/v1/finance/expensediture/updateExpense`,
  deleteExpensediture: `${baseUrl}/api/v1/finance/expensediture/deleteExpense`,
  getExpenditureByDate: `${baseUrl}/api/v1/finance/expensediture/getExpenseByDate`,
  getExpenditureByMonth: `${baseUrl}/api/v1/finance/expensediture/getExpenseByMonth`,
  getExpenditureByYear: `${baseUrl}/api/v1/finance/expensediture/getExpenseByYear`,
};

const IncomeUrl = {
  getIncomeSource: `${baseUrl}/api/v1/finance/incomeSource/getIncomeSource`,
  getIncome: `${baseUrl}/api/v1/finance/income/getIncome`,
  getIncomeById: `${baseUrl}/api/v1/finance/income/getIncomeById`,
  createIncomeSource: `${baseUrl}/api/v1/finance/incomeSource/createIncomeSource`,
  createIncome: `${baseUrl}/api/v1/finance/income/createIncome`,
  updateIncome: `${baseUrl}/api/v1/finance/income/updateIncome`,
  deleteIncome: `${baseUrl}/api/v1/finance/income/deleteIncome`,
  getIncomeByDate: `${baseUrl}/api/v1/finance/income/getIncomeByDate`,
  getIncomeByMonth: `${baseUrl}/api/v1/finance/income/getIncomeByMonth`,
  getIncomeByYear: `${baseUrl}/api/v1/finance/income/getIncomeByYear`,
};

const InvestmetUrl = {
  getInvestmentType: `${baseUrl}/api/v1/finance/investment/getInvestmentType`,
  getInvestmentRiskLevel: `${baseUrl}/api/v1/finance/investment/getInvestmentRiskLevel`,
  getInvestment: `${baseUrl}/api/v1/finance/investment/getInvestment`,
  createInvestment: `${baseUrl}/api/v1/finance/investment/createInvestment`,
  updateInvestment: `${baseUrl}/api/v1/finance/investment/updateInvestment`,
  deleteInvestment: `${baseUrl}/api/v1/finance/investment/deleteInvestment`,
};

const LoanUrl = {
  getLoanType: `${baseUrl}/api/v1/finance/loan/getLoanType`,
  getLoan: `${baseUrl}/api/v1/finance/loan/getLoan`,
  createLoan: `${baseUrl}/api/v1/finance/loan/createLoan`,
  updateLoan: `${baseUrl}/api/v1/finance/loan/updateLoan`,
  deleteLoan: `${baseUrl}/api/v1/finance/loan/deleteLoan`,
};

const SavingUrl = {
  getSaving: `${baseUrl}/api/v1/finance/saving/getSaving`,
  createSaving: `${baseUrl}/api/v1/finance/saving/createSaving`,
  updateSaving: `${baseUrl}/api/v1/finance/saving/updateSaving`,
  deleteSaving: `${baseUrl}/api/v1/finance/saving/deleteSaving`,
};

export default FinanceUrl;
export {
  AssetUrl,
  ExpenseditureUrl,
  IncomeUrl,
  InvestmetUrl,
  LoanUrl,
  SavingUrl,
};
