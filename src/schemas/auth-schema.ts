import * as z from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const SignupSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Please enter a valid email",
    }),
  phone: z
    .string({
      required_error: "Phone number is required",
    })
    .min(10, "Phone number must be at least 10 numbers"),
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name is required"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name is required"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string({
      required_error: "Confirm password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const ChangePasswordSchema = z.object({
  oldPassword: z
    .string({
      required_error: "Old password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  newPassword: z
    .string({
      required_error: "New password is required",
    })
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: z
    .string({
      required_error: "Confirm password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});
