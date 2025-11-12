import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import { resolveLocale } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | CreaNode Studio",
    default: "CreaNode Studio — Digital Product & E-commerce Experts",
  },
  description:
    "CreaNode Studio projektuje i wdraża nowoczesne serwisy www, aplikacje, oraz sklepy e-commerce zintegrowane z Twoim biznesem.",
  keywords: [
    "web development",
    "e-commerce",
    "branding",
    "Next.js agency",
    "CreaNode Studio",
  ],
  metadataBase: new URL("https://creanode.example"),
  openGraph: {
    title: "CreaNode Studio",
    description:
      "Partner technologiczny dla ambitnych marek: strategia, projektowanie, development, e-commerce.",
    url: "https://creanode.example",
    siteName: "CreaNode Studio",
    locale: "pl_PL",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const locale = await resolveLocale();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-slate-950 text-slate-100 antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
