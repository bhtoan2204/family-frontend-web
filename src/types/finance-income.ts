import { Member } from "./member";

export interface IncomeType {
  category: string;
  id_income_source: number;
}

export interface FinanceIncomeDate {
  id_income_source: number;
  income_category: string;
  income_amount: number;
  description: string;
  name: string;
}

export interface FinanceIncomeMonth {
  date: string;
  total: number;
  categories: {
    name: string;
    amount: number;
  }[];
}

export interface FinanceIncomeYear {
  month: number;
  total: number;
  categories: {
    name: string;
    amount: number;
  }[];
}

export interface CreateIncome {
  id_family: number;
  token: string;
  familyMembers: Member[];
  incomeTypes: IncomeType[];
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateIncomeType {
  id_family: number;
  setIncomeTypes: React.Dispatch<React.SetStateAction<IncomeType[]>>;
}

export interface StatisticIncome {
  month_year: string;
  total_income: string;
}
