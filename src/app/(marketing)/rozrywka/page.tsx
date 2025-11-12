import type { Metadata } from "next";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rozrywka XR i multimedia",
  description:
    "Budujemy doświadczenia XR, instalacje interaktywne i aplikacje multimedialne dla eventów oraz marek lifestyle.",
};

export default function EntertainmentPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-6">
      <ScrollReveal>
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_120px_rgba(2,6,23,0.7)]">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-400">
            Rozrywka & XR
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
            Interaktywne doświadczenia, które angażują odbiorców offline i online.
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300">
            Dostarczamy multimedialne strefy eventowe, instalacje XR i aplikacje
            gamingowe. Łączymy storytelling, design i technologię (WebGL/Unity,
            sensory IoT, backend skalowalny na OVH), aby uczestnicy zapamiętali
            Twoją markę na długo.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
              XR / MR
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
              Gaming
            </span>
            <span className="rounded-full border border-white/15 bg-white/5 px-4 py-2">
              Event tech
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/contact">Start projektu</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/case-studies">Zobacz case studies</Link>
            </Button>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
