"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashPassword, verifyPassword } from "@/lib/password";
import { createSession, destroySession } from "@/lib/session";

const registerSchema = z
  .object({
    email: z.string().email("Podaj poprawny adres e-mail"),
    password: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
    name: z.string().min(2, "Podaj imię i nazwisko"),
  })
  .superRefine((data, ctx) => {
    if (!/[A-Z]/.test(data.password)) {
      ctx.addIssue({
        code: "custom",
        message: "Hasło musi zawierać dużą literę",
        path: ["password"],
      });
    }
    if (!/[0-9]/.test(data.password)) {
      ctx.addIssue({
        code: "custom",
        message: "Hasło musi zawierać cyfrę",
        path: ["password"],
      });
    }
  });

const loginSchema = z.object({
  email: z.string().email("Podaj poprawny adres e-mail"),
  password: z.string().min(8, "Hasło musi mieć min. 8 znaków"),
});

export type AuthFormState = {
  success?: boolean;
  errors?: string[];
};

export async function registerAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = registerSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return {
      success: false,
      errors: ["Użytkownik o podanym adresie e-mail już istnieje."],
    };
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
    },
  });

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  redirect("/dashboard");
}

export async function loginAction(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return {
      success: false,
      errors: ["Nieprawidłowy login lub hasło."],
    };
  }

  const validPassword = await verifyPassword(password, user.passwordHash);
  if (!validPassword) {
    return {
      success: false,
      errors: ["Nieprawidłowy login lub hasło."],
    };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/");
}
