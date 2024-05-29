"use server";

import FinanceUrl, {
  AssetUrl,
  ExpenseditureUrl,
  IncomeUrl,
  InvestmetUrl,
  LoanUrl,
  SavingUrl,
} from "@/services/url/finance-url";
import {
  ExpenditureType,
  FinanceExpenditureDate,
  FinanceExpenditureMonth,
  FinanceExpenditureYear,
} from "@/types/finance-expenditure";
import {
  FinanceIncomeDate,
  FinanceIncomeMonth,
  FinanceIncomeYear,
  IncomeType,
} from "@/types/finance-income";
import { FinanceSummary } from "@/types/finance-summary";

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
    return data.data as FinanceSummary;
  } catch (error) {
    throw new Error("Internal Error!");
    // return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
  }
};

// Expensediture Actions
export const GetExpenseditures = async (token: string, familyId: string) => {
  try {
    const response = await fetch(
      ExpenseditureUrl.getExpenseditures + "/" + familyId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as ExpenditureType[];
    }
    return data.data as ExpenditureType[];
  } catch (error) {
    return [] as ExpenditureType[];
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
    return { error: "Internal Error!" };
  }
};
export const CreateExpensediture = async (token: string, data: any) => {
  try {
    await fetch(ExpenseditureUrl.createExpensediture, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
  }
};

// Income Actions
export const GetIncomeSource = async (token: string, familyId: string) => {
  try {
    const response = await fetch(IncomeUrl.getIncomeSource + "/" + familyId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!data) {
      return [] as IncomeType[];
    }
    return data.data as IncomeType[];
  } catch (error) {
    return [] as IncomeType[];
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
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
    return { error: "Internal Error!" };
  }
};
export const GetExpenditureByDate = async (
  token: string,
  familyId: string,
  date: string
) => {
  try {
    console.log(
      ExpenseditureUrl.getExpenditureByDate + "/" + familyId + "?date=" + date
    );
    const response = await fetch(
      ExpenseditureUrl.getExpenditureByDate + "/" + familyId + "?date=" + date,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as FinanceExpenditureDate[];
    }
    return data.data as FinanceExpenditureDate[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const GetExpenditureByMonth = async (
  token: string,
  familyId: string,
  month: string,
  year: string
) => {
  try {
    console.log(
      ExpenseditureUrl.getExpenditureByMonth +
        "/" +
        familyId +
        "?year=" +
        year +
        "&month=" +
        month
    );
    const response = await fetch(
      ExpenseditureUrl.getExpenditureByMonth +
        "/" +
        familyId +
        "?year=" +
        year +
        "&month=" +
        month,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as FinanceExpenditureMonth[];
    }
    return data.data as FinanceExpenditureMonth[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const GetExpenditureByYear = async (
  token: string,
  familyId: string,
  year: string
) => {
  try {
    const response = await fetch(
      ExpenseditureUrl.getExpenditureByYear + "/" + familyId + "?year=" + year,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as FinanceExpenditureYear[];
    }
    return data.data as FinanceExpenditureYear[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const GetIncomeByDate = async (
  date: string,
  familyId: string,
  token: string
) => {
  try {
    console.log(
      ExpenseditureUrl.getExpenditureByDate + "/" + familyId + "?date=" + date
    );
    const response = await fetch(
      IncomeUrl.getIncomeByDate + "/" + familyId + "?date=" + date,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as FinanceIncomeDate[];
    }
    return data.data as FinanceIncomeDate[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const GetIncomeByMonth = async (
  token: string,
  familyId: string,
  month: string,
  year: string
) => {
  try {
    const response = await fetch(
      IncomeUrl.getIncomeByMonth +
        "/" +
        familyId +
        "?year=" +
        year +
        "&month=" +
        month,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as FinanceIncomeMonth[];
    }
    return data.data as FinanceIncomeMonth[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};

export const GetIncomeByYear = async (
  token: string,
  familyId: string,
  year: string
) => {
  try {
    const response = await fetch(
      IncomeUrl.getIncomeByYear + "/" + familyId + "?year=" + year,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [] as FinanceIncomeYear[];
    }
    return data.data as FinanceIncomeYear[];
  } catch (error) {
    throw new Error("Internal Error!");
  }
};
