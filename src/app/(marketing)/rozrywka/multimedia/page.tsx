import type { Metadata } from "next";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export const metadata: Metadata = {
  title: "Multimedia & gaming",
  description:
    "Projektujemy gry promocyjne, aplikacje multimedialne oraz interfejsy instalacji eventowych.",
};

export default function EntertainmentMediaPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6">
      <ScrollReveal>
        <section className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-8">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Gaming & multimedia
          </p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Dedykowane gry i aplikacje multimedialne dla kampanii i showroomów.
          </h1>
          <p className="text-sm leading-relaxed text-slate-300">
            Tworzymy gry promocyjne w przeglądarce, aplikacje mobilne oraz
            dotykowe experience center. Zapewniamy design system, backend i
            monitoring, dzięki czemu nawet krótkie kampanie działają stabilnie.
          </p>
        </section>
      </ScrollReveal>
    </div>
  );
}
