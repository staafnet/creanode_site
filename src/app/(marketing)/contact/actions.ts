"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const contactSchema = z.object({
  fullName: z.string().min(2, "Podaj imię i nazwisko"),
  email: z.string().email("Podaj poprawny adres e-mail"),
  company: z.string().optional(),
  message: z.string().min(20, "Wiadomość powinna mieć min. 20 znaków"),
});

export type ContactFormState = {
  success?: boolean;
  errors?: string[];
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const parsed = contactSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    company: formData.get("company"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.issues.map((issue) => issue.message),
    };
  }

  await prisma.contactRequest.create({
    data: parsed.data,
  });

  return {
    success: true,
    errors: [],
  };
}
