import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case studies — wdrożenia CreaNode",
  description:
    "Przykładowe projekty CreaNode Studio: e-commerce, platformy B2B, integracje systemów oraz branding.",
};

const caseStudies = [
  {
    name: "NovaWear Collective",
    summary:
      "Headless commerce połączone z ERP i fulfillmentem. Wzrost konwersji o 35% w ciągu 3 miesięcy.",
  },
  {
    name: "FinSolve",
    summary:
      "Panel portfeli inwestycyjnych i aplikacja webowa dla doradców finansowych, zgodna z wymogami KNF.",
  },
  {
    name: "GreenFarm",
    summary:
      "Marketplace B2B dla producentów i dystrybutorów żywności. Automatyzacja zamówień i integracja z SAP.",
  },
];

export default function CaseStudiesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold text-white md:text-5xl">
        Partnerstwa, które napędzają wzrost.
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-slate-300">
        Poniżej znajdziesz kilka aktualnych studiów przypadku. Pełne decki i
        referencje udostępniamy podczas rozmów handlowych.
      </p>

      <div className="mt-12 space-y-6">
        {caseStudies.map((item) => (
          <article
            key={item.name}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <h2 className="text-2xl font-semibold text-white">{item.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {item.summary}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
