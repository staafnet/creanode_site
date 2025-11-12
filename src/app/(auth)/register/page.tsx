import type { Metadata } from "next";
import { RegisterForm } from "@/components/forms/register-form";

export const metadata: Metadata = {
  title: "Rejestracja",
  description:
    "Załóż konto klienta, aby szybciej zamawiać projekty i śledzić statusy sprintów.",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
