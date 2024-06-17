import * as z from "zod";

export const EducationProgressSchema = z.object({
  idMember: z.string().min(1, {
    message: "Member is required",
  }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  progressNotes: z.string().min(1, {
    message: "Progress notes is required",
  }),
  schoolInfo: z.string().min(1, {
    message: "School info is required",
  }),
});
