import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getCurrentUser();
  const locale = await resolveLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="relative min-h-screen bg-transparent text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 bg-gradient-to-b from-slate-950 via-[#050912] to-[#03060d]"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-grid-slate opacity-30"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 bg-noise opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[-200px] -z-10 h-[520px] w-full bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-rose-500/20 blur-3xl"
      />
      <SiteHeader
        isAuthenticated={Boolean(user)}
        userName={user?.name ?? user?.email ?? undefined}
        locale={locale}
        dictionary={dictionary.header}
      />
      <main className="relative z-10 flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
