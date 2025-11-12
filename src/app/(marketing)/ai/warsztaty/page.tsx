import type { Metadata } from "next";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Warsztaty AI",
  description:
    "Przygotowujemy zespoły do pracy z AI: od strategii, przez projektowanie promptów, po wdrożenia POC.",
};

export default function AIWorkshopsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6">
      <ScrollReveal>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Warsztaty AI
          </p>
          <h1 className="mt-4 text-3xl font-semibold text-white md:text-4xl">
            Sprinty edukacyjne i prototypowe dla leadershipu i zespołów operacyjnych.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            Omawiamy trendy AI, dobieramy przypadki użycia i tworzymy prototypy.
            Kończymy planem wdrożenia wraz z KPI i ryzykami prawnymi.
          </p>
          <Button asChild className="mt-6">
            <Link href="/contact">Zamów warsztat</Link>
          </Button>
        </section>
      </ScrollReveal>
    </div>
  );
}
