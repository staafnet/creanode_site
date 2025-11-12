import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Reset hasła",
  description:
    "Poproś o link do resetu hasła dla swojego konta w CreaNode Studio.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-5 rounded-3xl bg-white/5 p-8">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold text-white">Resetuj hasło</h1>
        <p className="text-sm text-slate-400">
          Wpisz adres e-mail powiązany z kontem. Gdy uruchomimy obsługę resetu,
          otrzymasz wiadomość z instrukcją.
        </p>
      </div>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
          >
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
            placeholder="name@company.com"
          />
        </div>
        <Button type="button" disabled className="w-full">
          Funkcja aktywna wkrótce
        </Button>
      </form>
      <p className="text-center text-xs text-slate-400">
        Pamiętasz hasło?{" "}
        <Link href="/login" className="font-semibold text-sky-300">
          Wróć do logowania
        </Link>
      </p>
    </div>
  );
}
