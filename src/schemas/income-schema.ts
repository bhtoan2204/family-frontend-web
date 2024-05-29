import * as z from "zod";

export const IncomeSchema = z.object({
  id_created_by: z.string().min(1, {
    message: "Created by is required",
  }),
  id_income_source: z.string().min(1, {
    message: "Income source is required",
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
  income_date: z.date({
    required_error: "Income date is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});
