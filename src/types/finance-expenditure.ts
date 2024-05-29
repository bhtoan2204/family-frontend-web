import { Member } from "./member";

export interface ExpenditureType {
  category: string;
  id_expense_type: number;
}

export interface FinanceExpenditureCategory {
  name: string;
  amount: number;
}

export interface FinanceExpenditureDate {
  id_expense_type: number;
  expense_category: string;
  expense_amount: number;
  description: string;
  name: string;
}

export interface FinanceExpenditureMonth {
  date: string;
  total: number;
  categories: FinanceExpenditureCategory[];
}

export interface FinanceExpenditureYear {
  month: number;
  total: number;
  categories: FinanceExpenditureCategory[];
}

export interface CreateExpenditure {
  id_family: number;
  token: string;
  familyMembers: Member[];
  expenseTypes: ExpenditureType[];
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CreateExpenditureType {
  id_family: number;
  token: string;
  setExpenditureTypes: React.Dispatch<React.SetStateAction<ExpenditureType[]>>;
}
