import * as z from "zod";

export const SubjectSchema = z.object({
  name: z.string().min(1, {
    message: "Subject name is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
});

export const SubjectTestSchema = z.object({
  midtermScore: z.string().transform(parseFloat).nullable(),
  finalScore: z.string().transform(parseFloat).nullable(),
  bonusScore: z.string().transform(parseFloat).nullable(),
});

export const ComponentSchema = z.object({
  name: z.string().min(1, {
    message: "Component name is required",
  }),
  score: z.string().transform(parseFloat),
});
