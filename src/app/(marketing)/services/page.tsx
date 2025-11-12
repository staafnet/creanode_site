import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Layers, LayoutDashboard, Network, ShoppingCart } from "lucide-react";

export const metadata: Metadata = {
  title: "Usługi digitalowe i e-commerce",
  description:
    "Strategia, projektowanie i development. Kompleksowe usługi CreaNode Studio dla biznesów cyfrowych.",
};

const services = [
  {
    slug: "web-apps",
    title: "Produkty i aplikacje webowe",
    description:
      "Projektujemy i wdrażamy aplikacje webowe oparte o Next.js, React i Node.js. Łączymy je z systemami CRM, ERP oraz dowolnymi usługami zewnętrznymi.",
    outcomes: [
      "Warsztaty discovery i planowanie feature'ów",
      "Projekt UX/UI, design system i komponenty React",
      "Architektura API, integracje i monitoring",
    ],
    icon: LayoutDashboard,
  },
  {
    slug: "ecommerce",
    title: "Sklepy headless i marketplace",
    description:
      "Budujemy headless commerce w oparciu o Next.js i Prisma. Dostarczamy koszyk, płatności, fulfillment oraz panel administracyjny.",
    outcomes: [
      "Strategia sprzedaży omnichannel",
      "Integracje płatności i logistyki",
      "Optymalizacja konwersji i A/B testing",
    ],
    icon: ShoppingCart,
  },
  {
    slug: "branding",
    title: "Branding i komunikacja",
    description:
      "Od repositioningu marki po kompleksowy brandbook. Tworzymy naming, identyfikację wizualną i system komunikacji spójny z Twoją strategią.",
    outcomes: [
      "Warsztat strategiczny i mapa percepcji",
      "System identyfikacji wizualnej i key visuals",
      "Materiały wdrożeniowe i guidelines",
    ],
    icon: Layers,
  },
  {
    slug: "automation",
    title: "Automatyzacja i integracje",
    description:
      "Łączymy Shopify, WooCommerce, Shoper, Baselinker lub systemy dedykowane z ERP, CRM, PIM i marketing automation. Budujemy procesy ETL i middleware.",
    outcomes: [
      "Audyt procesów i identyfikacja punktów manualnych",
      "Projekt architektury i orkiestracja danych",
      "Monitoring, alerting i serwis powdrożeniowy",
    ],
    icon: Network,
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
          Usługi CreaNode
        </span>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Holistyczne wsparcie digital: od strategii, przez design, po
          stabilny kod.
        </h1>
        <p className="text-base leading-relaxed text-slate-300">
          Pracujemy w cross-funkcjonalnych squadach, dowożąc wartość w krótkich
          sprintach. Zapewniamy obsługę end-to-end: strategia, discovery,
          design, development, wdrożenie i wzrost.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">Porozmawiajmy o Twoim produkcie</Link>
        </Button>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.slug}
            className="flex h-full flex-col rounded-3xl border border-white/5 bg-white/5 p-6 transition hover:border-sky-400/40 hover:bg-white/10"
          >
            <service.icon className="h-10 w-10 text-sky-300" />
            <h2 className="mt-5 text-2xl font-semibold text-white">
              {service.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {service.description}
            </p>
            <ul className="mt-4 flex-1 space-y-3 text-sm text-slate-200">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="flex items-start gap-2 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                >
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-300" />
                  {outcome}
                </li>
              ))}
            </ul>
            <Button
              variant="ghost"
              asChild
              size="sm"
              className="mt-6 justify-start text-slate-200 hover:text-white"
            >
              <Link href={`/services/${service.slug}`}>Szczegóły usługi</Link>
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
