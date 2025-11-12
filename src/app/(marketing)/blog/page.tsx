import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Insights & blog ekspercki",
  description:
    "Aktualności, artykuły i poradniki dotyczące produktów cyfrowych, e-commerce oraz marketingu growth.",
};

const posts = [
  {
    slug: "jak-zbudowac-headless-commerce-na-nextjs",
    title: "Jak zbudować headless commerce na Next.js i Prisma?",
    summary:
      "Architektura headless vs tradycyjne platformy, decyzje technologiczne, integracje oraz plan wdrożenia.",
    readingTime: "8 min",
    category: "E-commerce",
    publishedAt: "2025-02-01",
  },
  {
    slug: "warsztaty-product-discovery-w-3-dni",
    title: "Warsztaty Product Discovery w 3 dni — nasza checklista",
    summary:
      "Jak zorganizować efektywny sprint discovery, jakie materiały przygotować i jakie pytania zadać interesariuszom.",
    readingTime: "6 min",
    category: "Strategy",
    publishedAt: "2025-01-18",
  },
  {
    slug: "kiedy-zautomatyzowac-procesy-operacyjne",
    title: "Kiedy warto zautomatyzować procesy operacyjne w e-commerce?",
    summary:
      "Analiza sygnałów do automatyzacji, ROI z integracji ERP/CRM oraz przykłady use-case’ów.",
    readingTime: "5 min",
    category: "Automation",
    publishedAt: "2024-12-11",
  },
];

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-20 md:px-6">
      <header className="space-y-5">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
          Insights
        </span>
        <h1 className="text-4xl font-semibold text-white md:text-5xl">
          Trendy, case studies i praktyczne poradniki z projektów CreaNode.
        </h1>
        <p className="text-sm leading-relaxed text-slate-300">
          Co miesiąc dzielimy się doświadczeniem z projektów digitalowych, od
          discovery, przez design i development, aż po growth i automatyzację.
        </p>
      </header>

      <div className="mt-14 space-y-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="rounded-3xl border border-white/5 bg-white/5 p-6 transition hover:border-sky-400/40 hover:bg-white/10"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-400">
              {post.category} ・ {new Date(post.publishedAt).toLocaleDateString("pl-PL")}
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              {post.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              {post.summary}
            </p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>{post.readingTime} czytania</span>
              <Link
                href={`/blog/${post.slug}`}
                className="font-semibold text-sky-300 hover:text-sky-200"
              >
                Czytaj artykuł →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
