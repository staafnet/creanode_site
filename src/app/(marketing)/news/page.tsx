import type { Metadata } from "next";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export const metadata: Metadata = {
  title: "Aktualności CreaNode",
  description:
    "Sprawdź najnowsze aktualizacje, publikacje w mediach oraz wydarzenia z udziałem CreaNode Studio.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6">
      <ScrollReveal>
        <section className="rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Aktualności
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Aktualizacje, publikacje medialne i wydarzenia, w których bierzemy udział.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Wkrótce dodamy sekcję z kalendarzem eventów, notkami prasowymi oraz
            newsletterem. W międzyczasie zapraszamy do śledzenia bloga i kanałów
            społecznościowych.
          </p>
        </section>
      </ScrollReveal>
    </div>
  );
}
