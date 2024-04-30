"use server";

import FinanceUrl, {
  AssetUrl,
  ExpenseditureUrl,
  IncomeUrl,
  InvestmetUrl,
  LoanUrl,
  SavingUrl,
} from "@/services/url/finance-url";

// Finance Actions
export const GetFinanceSummary = async (token: string, familyId: number) => {
  try {
    const response = await fetch(
      `${FinanceUrl.getFinanceSummary}/${familyId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

// Asset Actions
export const GetAssets = async (
  token: string,
  familyId: number,
  page: string,
  itemsPerPage: string
) => {
  try {
    const response = await fetch(
      `${AssetUrl.getAssets}/${familyId}?page=${page}&itemsPerPage=${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const CreateAsset = async (token: string, data: any) => {
  try {
    await fetch(AssetUrl.createAsset, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateAsset = async (token: string, data: any) => {
  try {
    await fetch(AssetUrl.updateAsset, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteAsset = async (
  token: string,
  familyId: number,
  assetId: number
) => {
  try {
    await fetch(`${AssetUrl.deleteAsset}/${familyId}/${assetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

// Expensediture Actions
export const GetExpenseditures = async (token: string) => {
  try {
    const response = await fetch(ExpenseditureUrl.getExpenseditures, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetExpensediture = async (token: string) => {
  try {
    const response = await fetch(ExpenseditureUrl.getExpensediture, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const CreateExpensediture = async (token: string, data: any) => {
  try {
    await fetch(ExpenseditureUrl.createExpensedituree, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateExpensediture = async (token: string, data: any) => {
  try {
    await fetch(ExpenseditureUrl.updateExpensediture, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteExpensediture = async (
  token: string,
  familyId: number,
  expenseId: number
) => {
  try {
    await fetch(
      `${ExpenseditureUrl.deleteExpensediture}/${familyId}/${expenseId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

// Income Actions
export const GetIncomeSource = async (token: string) => {
  try {
    const response = await fetch(IncomeUrl.getIncomeSource, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetIncome = async (
  token: string,
  familyId: number,
  page: number,
  itemsPerPage: number
) => {
  try {
    const response = await fetch(
      `${IncomeUrl.getIncome}/${familyId}?page=${page}&itemsPerPage=${itemsPerPage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetIncomeById = async (
  token: string,
  familyId: number,
  incomeId: number
) => {
  try {
    const response = await fetch(
      `${IncomeUrl.getIncomeById}/${familyId}/${incomeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const CreateIncome = async (token: string, data: any) => {
  try {
    await fetch(IncomeUrl.createIncome, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateIncome = async (token: string, data: any) => {
  try {
    await fetch(IncomeUrl.updateIncome, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteIncome = async (
  token: string,
  familyId: number,
  incomeId: number
) => {
  try {
    await fetch(`${IncomeUrl.deleteIncome}/${familyId}/${incomeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

// Investment Actions
export const GetInvestmentType = async (token: string) => {
  try {
    const response = await fetch(InvestmetUrl.getInvestmentType, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetInvestmentRiskLevel = async (token: string) => {
  try {
    const response = await fetch(InvestmetUrl.getInvestmentRiskLevel, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetInvestment = async (token: string, familyId: number) => {
  try {
    const response = await fetch(`${InvestmetUrl.getInvestment}/${familyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const CreateInvestment = async (token: string, data: any) => {
  try {
    await fetch(InvestmetUrl.createInvestment, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateInvestment = async (token: string, data: any) => {
  try {
    await fetch(InvestmetUrl.updateInvestment, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteInvestment = async (token: string) => {
  try {
    await fetch(InvestmetUrl.deleteInvestment, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

// Loan Actions
export const GetLoanType = async (token: string) => {
  try {
    const response = await fetch(LoanUrl.getLoanType, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const GetLoan = async (token: string, familyId: number) => {
  try {
    const response = await fetch(`${LoanUrl.getLoan}/${familyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const CreateLoan = async (token: string, data: any) => {
  try {
    await fetch(LoanUrl.createLoan, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateLoan = async (token: string, data: any) => {
  try {
    await fetch(LoanUrl.updateLoan, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteLoan = async (
  token: string,
  familyId: number,
  loanId: number
) => {
  try {
    await fetch(`${LoanUrl.deleteLoan}/${familyId}/${loanId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};

// Saving Actions
export const GetSaving = async (token: string, familyId: number) => {
  try {
    const response = await fetch(`${SavingUrl.getSaving}/${familyId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const CreateSaving = async (token: string, data: any) => {
  try {
    await fetch(SavingUrl.createSaving, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const UpdateSaving = async (token: string, data: any) => {
  try {
    await fetch(SavingUrl.updateSaving, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
export const DeleteSaving = async (
  token: string,
  familyId: number,
  savingId: number
) => {
  try {
    await fetch(`${SavingUrl.deleteSaving}/${familyId}/${savingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return { error: "Something wrong!" };
  }
};
