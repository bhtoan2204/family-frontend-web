import * as z from "zod";

export const GuidelineSchema = z.object({
  name: z.string().min(1, {
    message: "Guideline name is required",
  }),
  description: z.string().min(1, {
    message: "Guideline description is required",
  }),
});

export const StepSchema = z.object({
  name: z.string().min(1, {
    message: "Step name is required",
  }),
  description: z.string().min(1, {
    message: "Step description is required",
  }),
  steps: z.string().optional(),
});
