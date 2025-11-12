'use client';

import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import type { ContactFormState } from "@/app/(marketing)/contact/actions";
import { submitContactForm } from "@/app/(marketing)/contact/actions";

const initialState: ContactFormState = {
  success: false,
  errors: [],
};

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactForm, initialState);

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-3xl border border-white/5 bg-white/5 p-6"
    >
      <div>
        <label
          htmlFor="fullName"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
        >
          Imię i nazwisko
        </label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          required
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          placeholder="Jak możemy się do Ciebie zwracać?"
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
          htmlFor="company"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
        >
          Firma
        </label>
        <input
          id="company"
          name="company"
          type="text"
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          placeholder="CreaNode Sp. z o.o."
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-semibold uppercase tracking-[0.3em] text-slate-400"
        >
          Projekt / potrzeba
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/40"
          placeholder="Opowiedz krótko o projekcie, produktach, integracjach lub wyzwaniach."
        />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs leading-relaxed text-slate-500">
          W przeciągu 24h odezwiemy się z terminem warsztatu kick-off.
        </p>
        <SubmitButton />
      </div>
      {state.errors && state.errors.length > 0 && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-xs text-red-200">
          {state.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      {state.success && (
        <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-200">
          Dziękujemy! Potwierdzenie wysłaliśmy na podany adres e-mail.
        </div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Wysyłanie..." : "Wyślij brief"}
    </Button>
  );
}
