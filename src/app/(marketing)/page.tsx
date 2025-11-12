import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Clock3,
  ShoppingBag,
  Users2,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { HeroBackground } from "@/components/effects/hero-background";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

const heroMetricIcons: Record<"growth" | "commerce" | "support", LucideIcon> = {
  growth: Sparkles,
  commerce: ShoppingBag,
  support: ShieldCheck,
};

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { active: true },
      take: 3,
      orderBy: { createdAt: "desc" },
      include: {
        images: {
          orderBy: { sortOrder: "asc" },
          take: 1,
        },
        category: true,
      },
    });

    return products;
  } catch (error) {
    console.error("Failed to load featured products", error);
    return [];
  }
}

export default async function HomePage() {
  const locale = await resolveLocale();
  const dictionary = getDictionary(locale);
  const heroTitleParts = dictionary.hero.title.split("{highlight}");
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <section className="relative isolate overflow-hidden py-28">
        <div className="pointer-events-none absolute inset-x-0 top-[-200px] -z-10 h-[460px] bg-gradient-to-br from-sky-500/25 via-transparent to-fuchsia-500/25 blur-[140px]" />
        <HeroBackground className="absolute inset-0 -z-20 opacity-50" />
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-[1.15fr_0.85fr] md:px-6">
          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[0.75rem] text-slate-200">
                Digital partnership
              </span>
              <span className="text-slate-400">CreaNode Studio</span>
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
              {heroTitleParts[0]}
              <span className="text-gradient">{dictionary.hero.highlight}</span>
              {heroTitleParts[1]}
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
              {dictionary.hero.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {dictionary.hero.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact" className="gap-2">
                  {dictionary.hero.ctaPrimary} <ArrowRight size={18} />
                </Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/case-studies" className="gap-2 text-slate-300">
                  {dictionary.hero.ctaSecondary}
                </Link>
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {Object.entries(dictionary.hero.metrics).map(([key, value]) => (
                <ValueCard
                  key={key}
                  icon={heroMetricIcons[key as keyof typeof heroMetricIcons]}
                  label={value.label}
                  metric={value.metric}
                  description={value.description}
                />
              ))}
            </div>
          </div>

          <div className="relative flex flex-col gap-4">
            <div className="glass-panel card-border relative rounded-3xl p-6 backdrop-blur">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-sky-500/10 via-transparent to-fuchsia-500/10" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                Proces CreaNode
              </p>
              <div className="mt-5 space-y-4">
                {dictionary.hero.timeline.map((step) => (
                  <ProcessStep
                    key={step.title}
                    title={step.title}
                    description={step.description}
                    badge={step.label}
                  />
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {dictionary.hero.quickStats.map((stat) => (
                <div
                  key={stat.title}
                  className="glass-panel rounded-2xl border border-white/5 p-5 text-slate-200"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                    {stat.meta}
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white">
                    {stat.title}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="border-y border-white/10 bg-slate-950/60 py-16">
          <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-around gap-6 px-4 text-slate-400 md:px-6">
            {dictionary.capabilities.map((item, index) => {
              const icons = [Users2, Clock3, Sparkles, ShieldCheck];
              const Icon = icons[index % icons.length];
              return (
                <CapabilityBadge key={item} icon={<Icon size={18} />}>
                  {item}
                </CapabilityBadge>
              );
            })}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-24">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold text-white md:text-4xl">
                  {dictionary.packages.title}
                </h2>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-300">
                  {dictionary.packages.description}
                </p>
              </div>
              <Button variant="secondary" asChild>
                <Link href="/shop" className="gap-2">
                  {dictionary.hero.ctaSecondary} <ArrowRight size={16} />
                </Link>
              </Button>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredProducts.length === 0 ? (
                <p className="col-span-full rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center text-sm text-slate-300">
                  {dictionary.shop.empty}
                </p>
              ) : (
                featuredProducts.map((product) => (
                  <article
                    key={product.id}
                    className="group relative flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_14px_60px_rgba(2,6,23,0.7)] transition hover:-translate-y-1 hover:border-sky-400/60"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.4em] text-sky-300">
                      {product.category?.name ?? "Oferta"}
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                      {product.description}
                    </p>
                    <div className="mt-6 flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">
                        {(product.priceCents / 100).toLocaleString("pl-PL", {
                          style: "currency",
                          currency: "PLN",
                        })}
                      </span>
                      <Button variant="ghost" asChild size="sm">
                        <Link href={`/shop/${product.slug}`} className="gap-2">
                          Szczegóły <ArrowRight size={16} />
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </section>
      </ScrollReveal>

      <section className="border-y border-white/5 bg-slate-950/70 py-24">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 md:grid-cols-[1.1fr_0.9fr] md:px-6">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
              Współpraca
            </span>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Partnerski model rozliczeń i transparentny backlog zadań.
            </h2>
            <p className="text-base leading-relaxed text-slate-300">
              Przygotowujemy roadmapę produktu, definiujemy sprinty i mierzymy
              KPI. Otrzymujesz dedykowany zespół złożony z Product Managera,
              Design Lead, Tech Leada oraz developerów. Wszystko w jednym SLA.
            </p>
            <ul className="grid gap-4 text-sm text-slate-200 md:grid-cols-2">
              {[
                "Raport velocity & KPI co dwa tygodnie",
                "Stały zespół i rezerwa godzin kryzysowych",
                "Warsztaty roadmapy raz na kwartał",
                "Monitoring uptime i security hardening",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 rounded-xl border border-white/5 bg-white/5 p-4"
                >
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 text-sky-300"
                    strokeWidth={2.5}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 via-slate-900 to-slate-950 p-8 shadow-lg shadow-sky-500/10">
            <h3 className="text-lg font-semibold text-white">
              Co otrzymujesz w abonamencie CreaCare?
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-slate-300">
              <li>
                <strong className="text-white">24/5 Service Desk</strong> — w
                godzinach 8:00-18:00 z gwarantowanym czasem reakcji 4h.
              </li>
              <li>
                <strong className="text-white">Release Management</strong> —
                planowanie releasów, checklisty QA, staging pipelines.
              </li>
              <li>
                <strong className="text-white">Analytics & CRO</strong> —
                dashboard KPI, testy A/B, rekomendacje zmian.
              </li>
              <li>
                <strong className="text-white">Security Hardening</strong> —
                audyty, alerting, kopie zapasowe SQLite, Disaster Recovery.
              </li>
            </ul>
            <Button className="mt-8 w-full" asChild>
              <Link href="/contact">Porozmawiajmy o wsparciu</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
                Opinie klientów
              </span>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                “CreaNode dostarczyło pełne wdrożenie headless z ERP w 12
                tygodni.”
              </h2>
              <p className="text-sm leading-relaxed text-slate-300">
                Dla marki fashion planowaliśmy sprzedaż omnichannel: web, mobile
                oraz POS. Zespół CreaNode przejął discovery, design system,
                implementację i integrację płatności oraz fulfillmentu z ERP.
              </p>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 opacity-80" />
                <div>
                  <p className="text-sm font-semibold text-white">
                    Marta Lewandowska
                  </p>
                  <p className="text-xs text-slate-400">
                    COO, NovaWear Collective
                  </p>
                </div>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "CX Roadmap",
                  body: "Warsztaty produktowe i roadmapa feature’ów z priorytetem na ROI.",
                },
                {
                  title: "Design Ops",
                  body: "Design system w Figma, komponenty React, biblioteka brandu.",
                },
                {
                  title: "Headless Commerce",
                  body: "Next.js, Prisma, SQLite lub Postgres. Integracje ERP, PIM, CRM.",
                },
                {
                  title: "Growth Experiments",
                  body: "Testy A/B, analityka GA4, wnioski z heatmap i sesji użytkowników.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex h-full flex-col rounded-2xl border border-white/5 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

type ValueCardProps = {
  icon: LucideIcon;
  label: string;
  metric: string;
  description: string;
};

function ValueCard({ icon: Icon, label, metric, description }: ValueCardProps) {
  return (
    <div className="glass-panel rounded-2xl border border-white/5 p-5 shadow-[0_15px_65px_rgba(2,6,23,0.6)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/20 to-indigo-500/30 text-sky-200">
        <Icon size={18} />
      </div>
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
        {label}
      </span>
      <p className="mt-2 text-2xl font-semibold text-white">{metric}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">
        {description}
      </p>
    </div>
  );
}

type ProcessStepProps = {
  title: string;
  description: string;
  badge?: string;
};

function ProcessStep({ title, description, badge }: ProcessStepProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-slate-950/60 px-4 py-4">
      {badge && (
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500">
          {badge}
        </p>
      )}
      <p className="mt-2 text-sm font-semibold text-white">{title}</p>
      <p className="mt-1 text-xs leading-relaxed text-slate-400">{description}</p>
    </div>
  );
}

type CapabilityBadgeProps = {
  icon: ReactNode;
  children: ReactNode;
};

function CapabilityBadge({ icon, children }: CapabilityBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-gradient-to-r from-white/10 via-white/5 to-transparent px-5 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-200 shadow-[0_10px_45px_rgba(2,6,23,0.55)]">
      <span className="text-sky-300">{icon}</span>
      {children}
    </div>
  );
}
