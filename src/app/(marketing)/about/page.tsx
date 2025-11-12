import type { Metadata } from "next";
import { Users, Target, Globe, Sparkle } from "lucide-react";

export const metadata: Metadata = {
  title: "O nas — CreaNode Studio",
  description:
    "Dowiedz się więcej o zespole CreaNode Studio. Strategia, design, development i e-commerce w jednym miejscu.",
};

const pillars = [
  {
    title: "Zespół multidyscyplinarny",
    description:
      "Product Managerowie, designerzy, developerzy i specjaliści marketingu pracują w jednym squadzie, dzięki czemu decyzje zapadają szybko i w oparciu o dane.",
    icon: Users,
  },
  {
    title: "Strategia oparta o KPI",
    description:
      "Każdy sprint zaczynamy od jasno określonych celów biznesowych. Dowozimy wartość mierzoną przyrostem przychodu, konwersji lub oszczędnością czasu operacyjnego.",
    icon: Target,
  },
  {
    title: "Technologia w standardach enterprise",
    description:
      "Stosujemy Next.js, Prisma, GraphQL/REST, CI/CD oraz monitoring. Wdrażamy rozwiązania zgodne z OWASP i RODO.",
    icon: Globe,
  },
  {
    title: "Partnerstwo, nie outsourcing",
    description:
      "Budujemy długofalowe relacje i prowadzimy kwartalne roadmapy rozwoju. Działamy jak rozszerzenie Twojego zespołu.",
    icon: Sparkle,
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-6">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
          Poznaj CreaNode
        </span>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Tworzymy produkty cyfrowe, które przynoszą efekt mierzalny w liczbach.
        </h1>
        <p className="text-base leading-relaxed text-slate-300">
          Jesteśmy zespołem łączącym strategię, design, development i growth.
          Budujemy platformy sprzedażowe, aplikacje webowe oraz ekosystemy
          marketingowe dla marek, które chcą rosnąć.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <pillar.icon className="h-10 w-10 text-sky-300" />
            <h2 className="mt-4 text-xl font-semibold text-white">
              {pillar.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 rounded-3xl border border-white/5 bg-gradient-to-br from-sky-500/20 via-blue-500/10 to-indigo-500/20 p-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-white">
            Zaufali nam liderzy z branż:
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            {[
              "Fashion & Retail",
              "FinTech i płatności",
              "Produkcja i B2B",
              "Healthcare & Pharma",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">
            Jak pracujemy na co dzień?
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-200">
            <li>
              ▸ Daily standup z Product Managerem i dedykowanym zespołem.
            </li>
            <li>▸ Demo sprintu co 2 tygodnie wraz z raportem KPI.</li>
            <li>▸ Warsztaty roadmapy i planowanie kwartalne.</li>
            <li>▸ Service Desk i monitoring 24/5.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
