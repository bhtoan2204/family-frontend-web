import { baseUrl } from "@/services/url";

const ExpenseditureUrl = {
  getExpenseditures: `${baseUrl}/api/v1/finance/expensediture/getExpenseType`,
  getExpensediture: `${baseUrl}/api/v1/finance/expensediture/getExpense`,
  createExpensedituree: `${baseUrl}/api/v1/finance/expensediture/createExpense`,
  updateExpensediture: `${baseUrl}/api/v1/finance/expensediture/updateExpense`,
  deleteExpensediture: `${baseUrl}/api/v1/finance/expensediture/deleteExpense`,
};

export default ExpenseditureUrl;
