export interface ExpenditureType {
    category: string;
    id_expense_type: number;
}

export interface FinanceExpenditureCategory {
    name: string;
    amount: number;
}

export interface FinanceExpenditureMonth {
  date: string;
  total: number;
  category: FinanceExpenditureCategory;
}

export interface FinanceExpenditureYear {
    month: number;
    total: number;
    category: FinanceExpenditureCategory[];
}
