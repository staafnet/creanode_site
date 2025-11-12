import { cookies } from "next/headers";

export type Locale = "pl" | "en" | "fr";

type HeroMetricKey = "growth" | "commerce" | "support";

type NavSectionKey =
  | "services"
  | "shop"
  | "about"
  | "contact"
  | "blog"
  | "news"
  | "cases";

type DropdownCopy<ItemKeys extends string> = {
  description: string;
  items: Record<ItemKeys, string>;
};

type Dictionary = {
  header: {
    nav: Record<NavSectionKey, string>;
    dropdowns: {
      services: DropdownCopy<
        "servicesOverview" | "servicesWeb" | "servicesCommerce" | "servicesBranding"
      >;
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
  hero: {
    highlight: string;
    title: string;
    description: string;
    tags: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    metrics: Record<
      HeroMetricKey,
      { label: string; metric: string; description: string }
    >;
    timeline: Array<{ label: string; title: string; description: string }>;
    quickStats: Array<{ title: string; meta: string; description: string }>;
  };
  capabilities: string[];
  packages: {
    title: string;
    description: string;
  };
  shop: {
    heroTitle: string;
    heroDescription: string;
    empty: string;
    quicklink: string;
    priceLabel: string;
    stockLabel: string;
    button: string;
  };
};

const dictionaries: Record<Locale, Dictionary> = {
  pl: {
    header: {
      nav: {
        services: "Usługi",
        shop: "Sklep",
        about: "O nas",
        contact: "Kontakt",
        blog: "Blog",
        news: "Aktualności",
        cases: "Case studies",
      },
      dropdowns: {
        services: {
          description: "Strategia • design • development",
          items: {
            servicesOverview: "Przegląd usług",
            servicesWeb: "Aplikacje i API",
            servicesCommerce: "Headless commerce",
            servicesBranding: "Branding i komunikacja",
          },
        },
        shop: {
          description: "Pakiety wdrożeniowe i warsztatowe",
          items: {
            shopCatalog: "Katalog produktów",
            shopBundles: "Pakiety tematyczne",
            shopCustom: "Dedykowana wycena",
          },
        },
        about: {
          description: "Poznaj studio i projekty",
          items: {
            aboutStudio: "O studiu",
            aboutCases: "Case studies",
            aboutRozrywka: "Rozrywka & XR",
          },
        },
        contact: {
          description: "Jak się z nami połączyć?",
          items: {
            contactForm: "Formularz kontaktowy",
            contactWorkshops: "Warsztaty AI",
            contactCare: "Program CreaCare",
          },
        },
        blog: {
          description: "Wiedza i inspiracje",
          items: {
            blogArticles: "Artykuły",
            blogGuides: "Poradniki",
            blogNewsletter: "Newsletter / aktualności",
          },
        },
        news: {
          description: "Aktualne wydarzenia",
          items: {
            newsUpdates: "Aktualności",
            newsPress: "Media i press kit",
            newsEvents: "Eventy i wystąpienia",
          },
        },
        cases: {
          description: "Wybrane wdrożenia",
          items: {
            casesAll: "Wszystkie case studies",
            casesRetail: "Retail & e-commerce",
            casesSaaS: "SaaS & platformy B2B",
          },
        },
      },
      signIn: "Zaloguj się",
      register: "Utwórz konto",
      dashboard: "Panel klienta",
      menu: "Menu",
    },
    hero: {
      highlight: "produkty cyfrowe",
      title: "Projektujemy i wdrażamy {highlight} i sklepy, które zarabiają.",
      description:
        "Od strategii i brandingu, przez design systemy, po development i integracje ERP/CRM.",
      tags: [
        "Next.js 16 App Router",
        "Headless commerce",
        "Integracje ERP/CRM",
        "Design system Figma",
      ],
      ctaPrimary: "Umów konsultację",
      ctaSecondary: "Zobacz case studies",
      metrics: {
        growth: {
          label: "Growth sprinty",
          metric: "14+",
          description: "strategicznych sprintów kwartalnie",
        },
        commerce: {
          label: "Sklepy headless",
          metric: "35%",
          description: "średni wzrost konwersji po migracji",
        },
        support: {
          label: "Service desk",
          metric: "99,7%",
          description: "dostępność utrzymywanych platform",
        },
      },
      timeline: [
        {
          label: "Etap 01",
          title: "Discovery 72h",
          description: "Warsztaty strategiczne, mapa interesariuszy i KPI.",
        },
        {
          label: "Etap 02",
          title: "Experience & Visuals",
          description: "Design system, prototypy i testy użyteczności.",
        },
        {
          label: "Etap 03",
          title: "Engineering & Launch",
          description: "Next.js + Prisma, płatności, monitoring i SLA.",
        },
      ],
      quickStats: [
        {
          title: "Stack produkcyjny",
          meta: "Fullstack",
          description: "Next.js · Prisma · SQLite/Postgres · pnpm",
        },
        {
          title: "CreaCare SLA",
          meta: "4h odpowiedź",
          description: "Monitoring 24/5, incident desk, roadmapy wzrostu",
        },
      ],
    },
    capabilities: [
      "Zespół multidyscyplinarny",
      "Sprinty 2-tygodniowe",
      "Design system Figma",
      "OWASP & GDPR ready",
    ],
    packages: {
      title: "Pakiety e-commerce i usług cyfrowych",
      description:
        "Wybierz gotowy pakiet albo poproś nas o dedykowane wdrożenie. Wszystko w jednym ekosystemie technologicznym.",
    },
    shop: {
      heroTitle: "Sklep CreaNode Studio",
      heroDescription:
        "Pakiety wdrożeniowe, warsztaty kick-off i wsparcie rozwojowe gotowe do wdrożenia.",
      empty:
        "Brak produktów w katalogu. Dodaj je w panelu lub uruchom seeda bazy.",
      quicklink: "Potrzebujesz dedykowanej wyceny?",
      priceLabel: "Cena",
      stockLabel: "Stan magazynowy",
      button: "Szczegóły",
    },
  },
  en: {
    header: {
      nav: {
        services: "Services",
        shop: "Store",
        about: "About",
        contact: "Contact",
        blog: "Insights",
        news: "Updates",
        cases: "Case studies",
      },
      dropdowns: {
        services: {
          description: "Strategy • design • engineering",
          items: {
            servicesOverview: "Overview",
            servicesWeb: "Web apps & APIs",
            servicesCommerce: "Headless commerce",
            servicesBranding: "Brand & communication",
          },
        },
        shop: {
          description: "Implementation bundles & care",
          items: {
            shopCatalog: "Product catalog",
            shopBundles: "Ready bundles",
            shopCustom: "Custom quote",
          },
        },
        about: {
          description: "Studio & culture",
          items: {
            aboutStudio: "About CreaNode",
            aboutCases: "Case studies",
            aboutRozrywka: "Entertainment & XR",
          },
        },
        contact: {
          description: "Get in touch",
          items: {
            contactForm: "Contact form",
            contactWorkshops: "AI workshops",
            contactCare: "CreaCare program",
          },
        },
        blog: {
          description: "Articles & resources",
          items: {
            blogArticles: "Articles",
            blogGuides: "Guides",
            blogNewsletter: "Newsletter / updates",
          },
        },
        news: {
          description: "Company news",
          items: {
            newsUpdates: "Updates",
            newsPress: "Press materials",
            newsEvents: "Events",
          },
        },
        cases: {
          description: "Selected case studies",
          items: {
            casesAll: "All case studies",
            casesRetail: "Retail & e-commerce",
            casesSaaS: "SaaS & platforms",
          },
        },
      },
      signIn: "Sign in",
      register: "Create account",
      dashboard: "Client portal",
      menu: "Menu",
    },
    hero: {
      highlight: "digital products",
      title: "We design and launch {highlight} and commerce platforms.",
      description:
        "Strategy, branding, design systems, development, and ERP/CRM integrations delivered by one team.",
      tags: [
        "Next.js 16 App Router",
        "Headless commerce",
        "ERP/CRM integrations",
        "Figma design system",
      ],
      ctaPrimary: "Book a consultation",
      ctaSecondary: "View case studies",
      metrics: {
        growth: {
          label: "Growth sprints",
          metric: "14+",
          description: "strategic sprints every quarter",
        },
        commerce: {
          label: "Headless commerce",
          metric: "35%",
          description: "average uplift after migration",
        },
        support: {
          label: "Service desk",
          metric: "99.7%",
          description: "uptime on managed platforms",
        },
      },
      timeline: [
        {
          label: "Phase 01",
          title: "Discovery 72h",
          description: "Strategy workshops, stakeholder map, KPI definition.",
        },
        {
          label: "Phase 02",
          title: "Experience & Visuals",
          description: "Design system, prototypes, usability testing.",
        },
        {
          label: "Phase 03",
          title: "Engineering & Launch",
          description: "Next.js + Prisma, payments, monitoring, SLA.",
        },
      ],
      quickStats: [
        {
          title: "Production stack",
          meta: "Fullstack",
          description: "Next.js · Prisma · SQLite/Postgres · pnpm",
        },
        {
          title: "CreaCare SLA",
          meta: "4h response",
          description: "24/5 monitoring, incident desk, growth roadmap",
        },
      ],
    },
    capabilities: [
      "Multidisciplinary team",
      "2-week sprints",
      "Figma design system",
      "OWASP & GDPR ready",
    ],
    packages: {
      title: "E-commerce bundles & digital services",
      description:
        "Pick a proven bundle or request a tailored rollout on the same scalable platform.",
    },
    shop: {
      heroTitle: "CreaNode Store",
      heroDescription:
        "Implementation bundles, discovery workshops, and growth care programs ready to launch.",
      empty: "No products yet. Seed the database or add them in the admin panel.",
      quicklink: "Need a custom quote?",
      priceLabel: "Price",
      stockLabel: "Stock",
      button: "Details",
    },
  },
  fr: {
    header: {
      nav: {
        services: "Services",
        shop: "Boutique",
        about: "À propos",
        contact: "Contact",
        blog: "Blog",
        news: "Actus",
        cases: "Études de cas",
      },
      dropdowns: {
        services: {
          description: "Stratégie • design • ingénierie",
          items: {
            servicesOverview: "Vue d'ensemble",
            servicesWeb: "Apps web & API",
            servicesCommerce: "Commerce headless",
            servicesBranding: "Branding & communication",
          },
        },
        shop: {
          description: "Offres prêtes & support",
          items: {
            shopCatalog: "Catalogue",
            shopBundles: "Offres packagées",
            shopCustom: "Devis personnalisé",
          },
        },
        about: {
          description: "Studio & projets",
          items: {
            aboutStudio: "À propos du studio",
            aboutCases: "Études de cas",
            aboutRozrywka: "Divertissement & XR",
          },
        },
        contact: {
          description: "Contactez-nous",
          items: {
            contactForm: "Formulaire de contact",
            contactWorkshops: "Ateliers IA",
            contactCare: "Programme CreaCare",
          },
        },
        blog: {
          description: "Articles & ressources",
          items: {
            blogArticles: "Articles",
            blogGuides: "Guides",
            blogNewsletter: "Newsletter / actus",
          },
        },
        news: {
          description: "Actualités",
          items: {
            newsUpdates: "Actus internes",
            newsPress: "Dossier presse",
            newsEvents: "Événements",
          },
        },
        cases: {
          description: "Réalisations",
          items: {
            casesAll: "Toutes les études de cas",
            casesRetail: "Retail & e-commerce",
            casesSaaS: "SaaS & plateformes",
          },
        },
      },
      signIn: "Connexion",
      register: "Créer un compte",
      dashboard: "Espace client",
      menu: "Menu",
    },
    hero: {
      highlight: "produits numériques",
      title: "Nous concevons et lançons des {highlight} et boutiques performantes.",
      description:
        "Stratégie, design system, développement et intégrations ERP/CRM au sein d’une même équipe.",
      tags: [
        "Next.js 16 App Router",
        "Commerce headless",
        "Intégrations ERP/CRM",
        "Design system Figma",
      ],
      ctaPrimary: "Planifier un appel",
      ctaSecondary: "Voir les cas clients",
      metrics: {
        growth: {
          label: "Sprints growth",
          metric: "14+",
          description: "sprints stratégiques par trimestre",
        },
        commerce: {
          label: "Commerce headless",
          metric: "35%",
          description: "hausse moyenne après migration",
        },
        support: {
          label: "Service desk",
          metric: "99,7%",
          description: "disponibilité des plateformes gérées",
        },
      },
      timeline: [
        {
          label: "Phase 01",
          title: "Discovery 72h",
          description: "Ateliers stratégiques, cartographie et KPI.",
        },
        {
          label: "Phase 02",
          title: "Experience & Visuals",
          description: "Design system, prototypes et tests utilisateurs.",
        },
        {
          label: "Phase 03",
          title: "Engineering & Launch",
          description: "Next.js + Prisma, paiements, monitoring et SLA.",
        },
      ],
      quickStats: [
        {
          title: "Stack de production",
          meta: "Fullstack",
          description: "Next.js · Prisma · SQLite/Postgres · pnpm",
        },
        {
          title: "SLA CreaCare",
          meta: "Réponse 4h",
          description: "Monitoring 24/5, incident desk, roadmap growth",
        },
      ],
    },
    capabilities: [
      "Équipe pluridisciplinaire",
      "Sprints de 2 semaines",
      "Design system Figma",
      "Conforme OWASP & RGPD",
    ],
    packages: {
      title: "Offres e-commerce & services digitaux",
      description:
        "Choisissez une offre prête à l’emploi ou un projet sur mesure sur la même plateforme scalable.",
    },
    shop: {
      heroTitle: "Boutique CreaNode Studio",
      heroDescription:
        "Offres d’implémentation, ateliers discovery et programmes de support prêts à être lancés.",
      empty:
        "Aucun produit pour le moment. Ajoutez-les dans l’administration ou lancez le seed.",
      quicklink: "Besoin d’un devis sur mesure ?",
      priceLabel: "Prix",
      stockLabel: "Stock",
      button: "Détails",
    },
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export async function resolveLocale(): Promise<Locale> {
  const lang = (await cookies()).get("lang")?.value as Locale | undefined;
  if (lang && lang in dictionaries) {
    return lang;
  }
  return "pl";
}
