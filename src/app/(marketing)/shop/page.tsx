import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export const metadata: Metadata = {
  title: "Sklep — pakiety usług i produkty cyfrowe",
  description:
    "Sklep CreaNode Studio: pakiety discovery, wdrożenia e-commerce, warsztaty i wsparcie abonamentowe.",
};

async function listProducts() {
  try {
    return await prisma.product.findMany({
      where: { active: true },
      orderBy: { createdAt: "desc" },
      include: {
        images: { orderBy: { sortOrder: "asc" }, take: 1 },
        category: true,
      },
    });
  } catch (error) {
    console.error("Cannot load products", error);
    return [];
  }
}

export default async function ShopPage() {
  const locale = await resolveLocale();
  const dictionary = getDictionary(locale);
  const products = await listProducts();

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
      <ScrollReveal>
        <section className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-8 shadow-[0_20px_120px_rgba(2,6,23,0.65)]">
          <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-sky-500/20 via-transparent to-indigo-500/20 blur-2xl" />
          <div className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
                {dictionary.shop.heroTitle}
              </span>
              <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">
                {dictionary.shop.heroDescription}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-200">
                {dictionary.packages.description}
              </p>
            </div>
            <Button variant="secondary" asChild>
              <Link href="/contact">{dictionary.shop.quicklink}</Link>
            </Button>
          </div>
        </section>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {products.length === 0 ? (
          <div className="col-span-full rounded-3xl border border-white/5 bg-white/5 p-8 text-center text-sm text-slate-300">
            {dictionary.shop.empty}
          </div>
        ) : (
          products.map((product) => (
            <article
              key={product.id}
              className="flex h-full flex-col rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_14px_60px_rgba(2,6,23,0.7)] transition hover:-translate-y-1 hover:border-sky-400/60"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400">
                {product.category?.name ?? "Oferta"}
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-white">
                {product.name}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">
                {product.description}
              </p>
              <div className="mt-6 space-y-2 text-sm text-slate-300">
                <p>
                  {dictionary.shop.priceLabel}:{" "}
                  <span className="font-semibold text-white">
                    {(product.priceCents / 100).toLocaleString("pl-PL", {
                      style: "currency",
                      currency: "PLN",
                    })}
                  </span>
                </p>
                <p>
                  {dictionary.shop.stockLabel}: {product.stock}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <Button asChild size="sm">
                  <Link href={`/shop/${product.slug}`}>
                    {dictionary.shop.button}
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" className="text-slate-200">
                  Dodaj do koszyka (wkrótce)
                </Button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
