import * as z from "zod";

export const RoomSchema = z.object({
  name: z.string().min(1, {
    message: "Room name is required",
  }),
});

export const HouseholdSchema = z.object({
  image: z.string().nullable(),
  name: z.string().min(1, {
    message: "Household name is required",
  }),
  idCategory: z.string().min(1, {
    message: "Category is required",
  }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  itemType: z.string().min(1, {
    message: "Item type is required",
  }),
  idRoom: z.string().min(1, {
    message: "Room is required",
  }),
});
