'use client';

import { useFormState, useFormStatus } from "react-dom";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { loginAction, type AuthFormState } from "@/app/(auth)/actions";

const initialState: AuthFormState = {
  success: false,
  errors: [],
};

export function LoginForm() {
  const [state, action] = useFormState(loginAction, initialState);

  return (
    <form action={action} className="space-y-5 rounded-3xl bg-white/5 p-8">
      <div className="space-y-3 text-center">
        <h1 className="text-2xl font-semibold text-white">Zaloguj się</h1>
        <p className="text-sm text-slate-400">
          Uzyskaj dostęp do projektów, dokumentacji i statusów sprintów.
        </p>
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
      </div>
      <div className="flex items-center justify-between text-xs">
        <Link
          href="/forgot-password"
          className="font-semibold text-sky-300 hover:text-sky-200"
        >
          Zapomniałeś hasła?
        </Link>
        <SubmitButton label="Zaloguj się" />
      </div>
      <p className="text-center text-xs text-slate-400">
        Nie masz konta?{" "}
        <Link href="/register" className="font-semibold text-sky-300">
          Utwórz je
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

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Przetwarzanie..." : label}
    </Button>
  );
}
