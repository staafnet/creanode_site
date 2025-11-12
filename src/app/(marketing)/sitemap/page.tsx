import Link from "next/link";

const sitemapLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/services", label: "Usługi" },
  { href: "/shop", label: "Sklep" },
  { href: "/about", label: "O nas" },
  { href: "/contact", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/privacy", label: "Polityka prywatności" },
  { href: "/terms", label: "Warunki współpracy" },
];

export default function SitemapPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold text-white md:text-5xl">
        Mapa serwisu
      </h1>
      <ul className="mt-8 space-y-3 text-sm text-slate-200">
        {sitemapLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="transition hover:text-sky-300 hover:underline"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
