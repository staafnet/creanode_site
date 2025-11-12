import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const serviceDetails = {
  "web-apps": {
    title: "Produkty i aplikacje webowe",
    description:
      "Projektujemy i budujemy złożone produkty cyfrowe: CRM, portale, platformy B2B/B2C, aplikacje SaaS. Łączymy design, architekturę oraz development w jednym zespole.",
    highlights: [
      "Audyt technologiczny i plan migracji (monolit → micro frontends)",
      "Projekt informacji, user flows i makiety UX",
      "Komponenty UI, design system, handoff do developmentu",
      "Backend w Node.js / Nest.js, Prisma ORM, GraphQL lub REST",
      "CI/CD (GitHub Actions), monitoring, logowanie i alerty",
    ],
  },
  ecommerce: {
    title: "Headless commerce i marketplace",
    description:
      "Tworzymy skalowalne sklepy headless oraz marketplace. Stawiamy na performance, SEO i wysoką konwersję, od discovery po utrzymanie.",
    highlights: [
      "Discovery commerce: segmentacja klientów, customer journey",
      "Architektura headless (Next.js, commerce API, ERP, PIM)",
      "Implementacja checkout, płatności, fulfillment, OMS",
      "Panel administracyjny z zarządzaniem katalogiem i promocjami",
      "Warsztaty growth i optymalizacja konwersji (CRO, A/B testing)",
    ],
  },
  branding: {
    title: "Branding i komunikacja",
    description:
      "Budujemy marki, które wyróżniają się strategicznie i wizualnie. Od warsztatów tożsamości, przez naming, po kompletny brandbook i wdrożenie w kanałach.",
    highlights: [
      "Strategia marki: archetyp, pozycjonowanie, value proposition",
      "Naming, tagline, messaging pillars i tone of voice",
      "System wizualny, key visuals, guidelines social media i offline",
      "Design system UI kompatybilny z brandbookiem",
      "Wsparcie wdrożeniowe: materiały sprzedażowe, landing pages",
    ],
  },
  automation: {
    title: "Integracje i automatyzacja procesów",
    description:
      "Skracamy operacje dzięki integracjom i automatyzacjom. Budujemy middleware, ETL i workflowy, aby Twój zespół mógł skupić się na kluczowych zadaniach.",
    highlights: [
      "Mapowanie procesów i identyfikacja punktów manualnych",
      "Integracje ERP, CRM, PIM, WMS, marketing automation",
      "Budowa API middleware, kolejek, workerów i webhooków",
      "Monitoring przepływu danych, alerting i raporty SLA",
      "Dokumentacja operacyjna, szkolenia i wsparcie powdrożeniowe",
    ],
  },
} as const;

type ServiceSlug = keyof typeof serviceDetails;

type ServicePageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service = serviceDetails[params.slug as ServiceSlug];

  if (!service) {
    return {
      title: "Usługa nie została znaleziona",
    };
  }

  return {
    title: `${service.title} — CreaNode Studio`,
    description: service.description,
  };
}

export default async function ServiceDetail({ params }: ServicePageProps) {
  const service = serviceDetails[params.slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6">
      <Button variant="ghost" size="sm" className="mb-8" asChild>
        <Link href="/services" className="gap-2 text-slate-300 hover:text-white">
          <ArrowLeft size={16} />
          Wszystkie usługi
        </Link>
      </Button>
      <h1 className="text-4xl font-semibold text-white md:text-5xl">
        {service.title}
      </h1>
      <p className="mt-6 text-base leading-relaxed text-slate-300">
        {service.description}
      </p>
      <div className="mt-10 space-y-3 rounded-3xl border border-white/5 bg-white/5 p-8 text-sm text-slate-200">
        {service.highlights.map((highlight) => (
          <div
            key={highlight}
            className="flex items-start gap-3 rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-3"
          >
            <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-sky-300" />
            {highlight}
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl border border-white/5 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-indigo-500/20 p-8">
        <h2 className="text-xl font-semibold text-white">
          Jak wygląda proces współpracy?
        </h2>
        <ul className="mt-6 grid gap-4 text-sm text-slate-200 md:grid-cols-2">
          <li className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
            01 ▸ Discovery & strategia w modelu warsztatowym.
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
            02 ▸ Kick-off sprintów, ustalenie KPI oraz backlogu.
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
            03 ▸ Dwutygodniowe releasy, raport velocity, demo.
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/10 px-4 py-4">
            04 ▸ Wdrożenie, monitoring i program CreaCare.
          </li>
        </ul>
        <Button className="mt-8" asChild>
          <Link href="/contact">Umów warsztat startowy</Link>
        </Button>
      </div>
    </div>
  );
}
