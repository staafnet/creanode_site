import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { getDictionary, resolveLocale } from "@/lib/i18n";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

type ProductPageProps = {
  params: { slug: string };
};

async function findProduct(slug: string) {
  try {
    return await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        category: true,
      },
    });
  } catch (error) {
    console.error("Cannot load product", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await findProduct(params.slug);
  if (!product) {
    return {
      title: "Produkt nie został znaleziony",
    };
  }

  return {
    title: `${product.name} — oferta CreaNode`,
    description: product.seoDescription ?? product.description.slice(0, 150),
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const locale = await resolveLocale();
  const dictionary = getDictionary(locale);
  const product = await findProduct(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-6">
      <nav className="text-xs text-slate-400">
        <Link href="/shop" className="hover:text-sky-300">
          {dictionary.header.nav.shop}
        </Link>{" "}
        / <span className="text-slate-200">{product.name}</span>
      </nav>
      <ScrollReveal>
        <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
              {product.category?.name ?? "Oferta"}
            </span>
            <h1 className="text-4xl font-semibold text-white md:text-5xl">
              {product.name}
            </h1>
            <p className="text-sm leading-relaxed text-slate-300">
              {product.description}
            </p>
            <div className="glass-panel rounded-3xl border border-white/10 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                Co otrzymujesz
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-200">
                <li>
                  ▸ Discovery sprint i warsztat kick-off z zespołem projektowym.
                </li>
                <li>▸ Dedykowany zespół produktowy (PM, UX, UI, Dev, QA).</li>
                <li>▸ Wdrożenie na infrastrukturze OVH lub Twojej chmurze.</li>
                <li>▸ Program CreaCare z monitorowaniem i SLA.</li>
              </ul>
            </div>
          </div>
          <aside className="space-y-6 rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-[0_14px_60px_rgba(2,6,23,0.65)]">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {dictionary.shop.priceLabel}
              </p>
              <p className="mt-2 text-3xl font-semibold text-white">
                {(product.priceCents / 100).toLocaleString("pl-PL", {
                  style: "currency",
                  currency: "PLN",
                })}
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Harmonogram i zakres możemy dostosować do Twoich wymagań.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-sky-500/20 via-blue-500/10 to-indigo-500/20 p-4 text-sm text-slate-200">
              <p className="font-semibold text-white">Wsparcie eksperckie</p>
              <p className="mt-2 text-xs">
                Po zakupie otrzymasz dostęp do Service Desk oraz dedykowanego
                PM-a, który będzie prowadził projekt.
              </p>
            </div>

            <Button className="w-full" size="lg">
              Dodaj do koszyka (wkrótce)
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full text-slate-200">
              <Link href="/contact">{dictionary.shop.quicklink}</Link>
            </Button>
          </aside>
        </div>
      </ScrollReveal>
    </div>
  );
}
