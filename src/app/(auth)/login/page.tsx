import type { Metadata } from "next";
import { LoginForm } from "@/components/forms/login-form";

export const metadata: Metadata = {
  title: "Logowanie",
  description:
    "Zaloguj się do panelu klienta CreaNode, aby zarządzać projektami i zamówieniami.",
};

export default function LoginPage() {
  return <LoginForm />;
}
