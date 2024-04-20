import { SignupSchema } from "@/schemas";
import { AuthUrl } from "@/services/url";
import * as z from "zod";

export const signUp = async (data: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const { email, password, firstName, lastName, phone } = validatedFields.data;

  try {
    await fetch(AuthUrl.signup, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
        phone: phone,
      }),
    });
    return { success: "Logged in" };
  } catch (error) {
    return { error: "Invalid credentials!" };
  }
};
