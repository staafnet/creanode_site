import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const posts = {
  "jak-zbudowac-headless-commerce-na-nextjs": {
    title: "Jak zbudować headless commerce na Next.js i Prisma?",
    content: [
      "Migracja do architektury headless daje pełną kontrolę nad doświadczeniem klienta oraz integracjami backendowymi.",
      "W CreaNode wykorzystujemy Next.js (app router, Server Actions) do tworzenia warstwy prezentacji oraz Prisma do warstwy danych. SQLite sprawdza się w MVP i środowisku staging, a docelowo przechodzimy na PostgreSQL.",
      "Kluczowe kroki: Discovery i identyfikacja wymagań, projekt danych i integracji, budowa UI oraz uruchomienie cyklicznych eksperymentów CRO.",
    ],
  },
  "warsztaty-product-discovery-w-3-dni": {
    title: "Warsztaty Product Discovery w 3 dni — nasza checklista",
    content: [
      "Discovery sprint pozwala zespołowi i interesariuszom ustalić kierunek produktu w zaledwie kilka dni.",
      "Dzień 1: mapowanie problemu i interesariuszy. Dzień 2: eksploracja rozwiązań, prototypy low-fi. Dzień 3: plan eksperymentów i metryki sukcesu.",
      "Efektem warsztatu jest backlog inicjatyw, plan MVP oraz harmonogram sprintów rozwojowych.",
    ],
  },
  "kiedy-zautomatyzowac-procesy-operacyjne": {
    title: "Kiedy warto zautomatyzować procesy operacyjne w e-commerce?",
    content: [
      "Automatyzacja zaczyna się opłacać, gdy rośnie wolumen zamówień, a manualna obsługa spowalnia działanie firmy.",
      "Najczęstsze sygnały: pomyłki w zamówieniach, brak spójnych danych magazynowych, opóźnione aktualizacje cen i stanów.",
      "Budujemy middleware w Node.js, integrujemy ERP/CRM i dbamy o monitoring przepływu danych oraz alerty SLA.",
    ],
  },
} as const;

type BlogSlug = keyof typeof posts;

type BlogPageProps = {
  params: { slug: string };
};

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const post = posts[params.slug as BlogSlug];
  return post
    ? {
        title: post.title,
        description: post.content[0],
      }
    : {
        title: "Artykuł nie został znaleziony",
      };
}

export default function BlogArticlePage({ params }: BlogPageProps) {
  const post = posts[params.slug as BlogSlug];
  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 md:px-6">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90"
      >
        <ArrowLeft size={14} />
        Powrót
      </Link>
      <h1 className="mt-6 text-4xl font-semibold text-white md:text-5xl">
        {post.title}
      </h1>
      <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-200">
        {post.content.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
