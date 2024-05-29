import * as z from "zod";

export const ExpenditureSchema = z.object({
  id_created_by: z.string().min(1, {
    message: "Created by is required",
  }),
  id_expense_type: z.string().min(1, {
    message: "Expense type is required",
  }),
  amount: z.string().refine(
    (val) => {
      const parsed = parseFloat(val);
      return !isNaN(parsed) && parsed > 0;
    },
    {
      message: "Amount must be a valid positive number",
    }
  ),
  expenditure_date: z.date({
    required_error: "Expenditure date is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});
