import * as z from "zod";

export const ExpenditureTypeSchema = z.object({
  name: z.string().min(1, {
    message: "Title is required",
  }),
});
