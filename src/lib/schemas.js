import { z } from "zod";

export const signInSchema = z.object({
    email: z.email("Invalid email address"),
     password: z.string()
        .min(1, "Required")
        .min(8, "Password must be at least 8 characters")
        .regex(/\d+/, "Must contain a digit")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),
});

export const signUpSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    firstName: z.string()
        .min(2, "First name must be at least 3 characters")
        .max(50, "First name must be less than 50 characters"),
    lastName: z.string()
        .min(2, "Last name must be at least 3 characters")
        .max(50, "Last name must be less than 50 characters"),
    email: z.email("Invalid email address"),
    password: z.string()
        .min(1, "Required")
        .min(8, "Password must be at least 8 characters")
        .regex(/\d+/, "Must contain a digit")
        .regex(/[a-z]/, "Must contain a lowercase letter")
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[@$?!%&*]+/, "Must contain a special character (@$?!%&*)"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

  export const firmSchema = z.object({
  name: z.string()
    .trim()
    .min(2, "Firm name must be at least 2 characters")
    .max(100, "Firm name must be less than 100 characters"),
  phone: z.string()
    .trim()
    .min(8, "Phone must be at least 8 characters")
    .max(25, "Phone must be less than 25 characters")
    .regex(/^[\d\s()+-]+$/, "Invalid phone format"),
  address: z.string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(300, "Address must be less than 300 characters"),
  image: z.url("Invalid image URL")
});