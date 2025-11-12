import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { getCurrentUser } from "@/lib/auth";
import { getDictionary, resolveLocale } from "@/lib/i18n";

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();
  const locale = await resolveLocale();
  const dictionary = getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-950 to-slate-900">
      <SiteHeader
        isAuthenticated={Boolean(user)}
        userName={user?.name ?? user?.email ?? undefined}
        locale={locale}
        dictionary={dictionary.header}
      />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}
