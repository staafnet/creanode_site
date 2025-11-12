'use client';

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLanguageAction } from "@/app/actions/preferences";
import type { Locale } from "@/lib/i18n";

const LANGUAGES: Array<{ value: Locale; label: string }> = [
  { value: "pl", label: "PL" },
  { value: "en", label: "EN" },
  { value: "fr", label: "FR" },
];

type LanguageSwitcherProps = {
  currentLocale: Locale;
};

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSelect = (nextLocale: Locale) => {
    if (nextLocale === currentLocale) return;
    startTransition(async () => {
      await setLanguageAction(nextLocale);
      router.refresh();
    });
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/15 bg-white/5 p-1 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-100">
      {LANGUAGES.map((lang) => {
        const isActive = lang.value === currentLocale;
        return (
          <button
            key={lang.value}
            type="button"
            disabled={isPending}
            onClick={() => handleSelect(lang.value)}
            className={`rounded-full px-3 py-1 transition ${
              isActive
                ? "bg-white text-slate-900"
                : "text-slate-200 hover:text-white"
            }`}
            aria-pressed={isActive}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
