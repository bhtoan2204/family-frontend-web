import * as z from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 50;
const ACCEPTED_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const ChatInputSchema = z.object({
  content: z
    .string({
      required_error: "Message is required",
    })
    .min(1, "Message is required"),
});

export const MessageFileSchema = z.object({
  imageUrl: z
    .any()
    .refine((files) => {
      return files?.[0]?.size <= MAX_FILE_SIZE;
    }, `Max image size is 5MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});
