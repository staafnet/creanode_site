import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export const metadata: Metadata = {
  title: "AI produkty i integracje",
  description:
    "Projektujemy i wdrażamy produkty AI: od analizy danych, przez integracje API, aż po dedykowane modele.",
};

export default function AIPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-6">
      <ScrollReveal>
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-slate-900 to-slate-950 p-8 shadow-[0_20px_120px_rgba(2,6,23,0.7)]">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            AI engineering
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Produkty AI, które automatyzują procesy i realnie wspierają zespoły.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
            Tworzymy chatboty, kopiloty dla sprzedaży i narzędzia predykcyjne.
            Integrujemy modele (OpenAI, Azure, HuggingFace) z Twoim CRM/ERP
            oraz doradzamy, jak bezpiecznie zarządzać danymi.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Porozmawiajmy o AI</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/services">Usługi</Link>
            </Button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
