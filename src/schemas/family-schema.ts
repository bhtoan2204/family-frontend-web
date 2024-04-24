import * as z from "zod";

export const FamilySchema = z.object({
  name: z.string().min(1, {
    message: "Family name is required",
  }),
  description: z.string().min(1, {
    message: "Family description is required",
  }),
});
