import type { ReactNode } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/forms/logout-button";
import { SiteHeader } from "@/components/layout/site-header";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary, resolveLocale } from "@/lib/i18n";

const dashboardLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/orders", label: "Zamówienia" },
  { href: "/dashboard/profile", label: "Profil" },
];

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  const locale = await resolveLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="min-h-screen bg-slate-950">
      <SiteHeader
        isAuthenticated={Boolean(user)}
        userName={user?.name ?? user?.email ?? undefined}
        locale={locale}
        dictionary={dictionary.header}
      />
      <div className="border-b border-white/5 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-400 md:px-6">
          <nav className="flex flex-wrap items-center gap-4">
            {dashboardLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
          <LogoutButton />
        </div>
      </div>
      <main className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">{children}</main>
    </div>
  );
}
