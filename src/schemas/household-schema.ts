import * as z from "zod";

export const RoomSchema = z.object({
  name: z.string().min(1, {
    message: "Room name is required",
  }),
});
