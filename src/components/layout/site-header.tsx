'use client';

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/(auth)/actions";
import type { Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/preferences/language-switcher";

const navSections = [
  {
    key: "services",
    href: "/services",
    items: [
      { key: "servicesOverview", href: "/services" },
      { key: "servicesWeb", href: "/services#web-apps" },
      { key: "servicesCommerce", href: "/services#ecommerce" },
      { key: "servicesBranding", href: "/services#branding" },
    ],
  },
  {
    key: "shop",
    href: "/shop",
    items: [
      { key: "shopCatalog", href: "/shop" },
      { key: "shopBundles", href: "/shop#bundles" },
      { key: "shopCustom", href: "/contact" },
    ],
  },
  {
    key: "about",
    href: "/about",
    items: [
      { key: "aboutStudio", href: "/about" },
      { key: "aboutCases", href: "/case-studies" },
      { key: "aboutRozrywka", href: "/rozrywka" },
    ],
  },
  {
    key: "contact",
    href: "/contact",
    items: [
      { key: "contactForm", href: "/contact" },
      { key: "contactWorkshops", href: "/ai/warsztaty" },
      { key: "contactCare", href: "/services#care" },
    ],
  },
  {
    key: "blog",
    href: "/blog",
    items: [
      { key: "blogArticles", href: "/blog" },
      { key: "blogGuides", href: "/blog#guides" },
      { key: "blogNewsletter", href: "/news" },
    ],
  },
  {
    key: "news",
    href: "/news",
    items: [
      { key: "newsUpdates", href: "/news" },
      { key: "newsPress", href: "/case-studies#press" },
      { key: "newsEvents", href: "/rozrywka/multimedia" },
    ],
  },
  {
    key: "cases",
    href: "/case-studies",
    items: [
      { key: "casesAll", href: "/case-studies" },
      { key: "casesRetail", href: "/case-studies#retail" },
      { key: "casesSaaS", href: "/case-studies#saas" },
    ],
  },
] as const;

type HeaderDictionary = {
  nav: Record<(typeof navSections)[number]["key"], string>;
  dropdowns: {
    services: DropdownCopy<"servicesOverview" | "servicesWeb" | "servicesCommerce" | "servicesBranding">;
    shop: DropdownCopy<"shopCatalog" | "shopBundles" | "shopCustom">;
    about: DropdownCopy<"aboutStudio" | "aboutCases" | "aboutRozrywka">;
    contact: DropdownCopy<"contactForm" | "contactWorkshops" | "contactCare">;
    blog: DropdownCopy<"blogArticles" | "blogGuides" | "blogNewsletter">;
    news: DropdownCopy<"newsUpdates" | "newsPress" | "newsEvents">;
    cases: DropdownCopy<"casesAll" | "casesRetail" | "casesSaaS">;
  };
  signIn: string;
  register: string;
  dashboard: string;
  menu: string;
};

type DropdownCopy<ItemKeys extends string> = {
  description: string;
  items: Record<ItemKeys, string>;
};

type SiteHeaderProps = {
  isAuthenticated?: boolean;
  userName?: string | null;
  locale: Locale;
  dictionary: HeaderDictionary;
};

export function SiteHeader({
  isAuthenticated = false,
  userName,
  locale,
  dictionary,
}: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<Record<string, boolean>>({});

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 text-lg font-semibold text-white shadow-lg shadow-sky-500/30">
            CN
          </span>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-wide text-white">
              CreaNode
            </span>
            <span className="text-xs uppercase tracking-[0.28em] text-slate-400">
              Digital Studio
            </span>
          </div>
        </Link>

        <nav className="hidden flex-1 items-center gap-6 text-sm font-medium text-slate-300 transition md:flex">
          {navSections.map((section) => {
            const copy = dictionary.dropdowns[section.key];
            return (
              <div
                key={section.key}
                className="relative"
                onMouseEnter={() => setOpenDropdown(section.key)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:border-white/40"
                  aria-expanded={openDropdown === section.key}
                >
                  {dictionary.nav[section.key]}
                  <ChevronDown
                    size={14}
                    className={clsx(
                      "transition-transform",
                      openDropdown === section.key ? "rotate-180" : "rotate-0",
                    )}
                  />
                </button>
                <div
                  className={clsx(
                    "absolute left-0 top-full mt-3 w-72 rounded-2xl border border-white/10 bg-slate-950/95 p-4 shadow-2xl shadow-black/40 transition-all duration-200",
                    openDropdown === section.key
                      ? "pointer-events-auto translate-y-0 opacity-100"
                      : "pointer-events-none -translate-y-2 opacity-0",
                  )}
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                    {copy.description}
                  </p>
                  <div className="mt-3 space-y-2 text-sm text-white">
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl border border-transparent px-3 py-2 text-left text-slate-200 transition hover:border-white/15 hover:bg-white/5"
                      >
                        {copy.items[item.key as keyof typeof copy.items]}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="ml-auto hidden items-center space-x-3 md:flex">
          <LanguageSwitcher currentLocale={locale} />
          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-slate-300">
                {userName ? `Cześć, ${userName.split(" ")[0]}!` : "Panel klienta"}
              </span>
              <Button variant="secondary" asChild size="sm">
                <Link href="/dashboard">{dictionary.dashboard}</Link>
              </Button>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="text-sm font-medium text-slate-300 transition hover:text-white"
                >
                  Wyloguj
                </button>
              </form>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-300 transition hover:text-white"
              >
                {dictionary.signIn}
              </Link>
              <Button asChild>
                <Link href="/register">{dictionary.register}</Link>
              </Button>
            </>
          )}
        </div>

        <button
          className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-800 text-slate-300 transition hover:border-slate-700 hover:text-white md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav
          className={clsx(
            "absolute left-0 top-full w-full origin-top border-b border-slate-800 bg-slate-950/95 px-4 pb-6 pt-2 shadow-xl transition-all duration-200 md:hidden",
            mobileOpen
              ? "pointer-events-auto scale-y-100 opacity-100"
              : "pointer-events-none scale-y-0 opacity-0",
          )}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <LanguageSwitcher currentLocale={locale} />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {dictionary.menu}
              </span>
            </div>
            {navSections.map((section) => {
              const copy = dictionary.dropdowns[section.key];
              const expanded = Boolean(mobileDropdowns[section.key]);
              return (
                <div key={section.key} className="rounded-2xl border border-white/10 bg-white/5">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white"
                    onClick={() =>
                      setMobileDropdowns((prev) => ({
                        ...prev,
                        [section.key]: !expanded,
                      }))
                    }
                    aria-expanded={expanded}
                  >
                    {dictionary.nav[section.key]}
                    <ChevronDown
                      size={16}
                      className={clsx(
                        "transition-transform",
                        expanded ? "rotate-180" : "rotate-0",
                      )}
                    />
                  </button>
                  <div
                    className={clsx(
                      "space-y-1 px-4 pb-4 text-sm text-slate-200 transition-all duration-200",
                      expanded ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
                    )}
                  >
                    {section.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-2 py-2 text-left text-slate-200 transition hover:bg-white/5"
                      >
                        {copy.items[item.key as keyof typeof copy.items]}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-slate-100"
                  >
                    {dictionary.dashboard}
                  </Link>
                  <form action={logoutAction}>
                    <button
                      type="submit"
                      className="text-left text-sm font-semibold text-slate-100"
                    >
                      Wyloguj
                    </button>
                  </form>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-semibold text-slate-100"
                  >
                    {dictionary.signIn}
                  </Link>
                  <Button asChild size="sm">
                    <Link href="/register" onClick={() => setMobileOpen(false)}>
                      {dictionary.register}
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
