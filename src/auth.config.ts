import { LoginSchema } from "@/schemas";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { AuthServices } from "./services/apiclient";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          if (!email || !password) {
            return null;
          }

          const response = await AuthServices.login({ email, password });
          return response;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
