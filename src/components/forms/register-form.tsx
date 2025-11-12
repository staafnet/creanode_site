'use client';

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { registerAction, type AuthFormState } from "@/app/(auth)/actions";

const initialState: AuthFormState = {
  success: false,
  errors: [],
};

export function RegisterForm() {
  const [state, action] = useFormState(registerAction, initialState);

  return (
    <form action={action} className="space-y-5 rounded-3xl bg-white/5 p-8">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold text-white">Stwórz konto</h1>
        <p className="text-sm text-slate-400">
          Uzyskaj dostęp do panelu klienta, zamówień i statusów sprintów.
        </p>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
        >
          Imię i nazwisko
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          placeholder="Jan Nowak"
        />
      </div>
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
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
        >
          Hasło
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          placeholder="********"
        />
        <p className="mt-2 text-xs text-slate-500">
          Hasło musi zawierać minimum 8 znaków, w tym dużą literę i cyfrę.
        </p>
      </div>
      <SubmitButton />
      <p className="text-center text-xs text-slate-400">
        Masz już konto?{" "}
        <Link href="/login" className="font-semibold text-sky-300">
          Zaloguj się
        </Link>
      </p>
      {state.errors && state.errors.length > 0 && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-500/10 px-4 py-3 text-xs text-amber-200">
          {state.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Rejestracja..." : "Utwórz konto"}
    </Button>
  );
}
