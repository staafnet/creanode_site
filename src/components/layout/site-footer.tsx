import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";

const currentYear = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-14 md:flex-row md:items-start md:justify-between md:px-6">
        <div className="max-w-sm space-y-4">
          <div className="flex items-center space-x-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-500 text-lg font-semibold text-white shadow-lg shadow-sky-500/30">
              CN
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold tracking-wide text-white">
                CreaNode Studio
              </span>
              <span className="text-xs uppercase tracking-[0.28em] text-slate-400">
                Strategy · Design · Engineering
              </span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-400">
            Digital growth partner for ambitious brands. We ship strategy-led
            experiences, full-stack products, and e-commerce systems that scale.
          </p>
          <div className="flex items-center space-x-3">
            <SocialLink href="mailto:contact@creanode.com" label="Mail">
              <Mail size={18} />
            </SocialLink>
            <SocialLink href="https://www.linkedin.com" label="LinkedIn">
              <Linkedin size={18} />
            </SocialLink>
            <SocialLink href="https://www.instagram.com" label="Instagram">
              <Instagram size={18} />
            </SocialLink>
            <SocialLink href="https://www.facebook.com" label="Facebook">
              <Facebook size={18} />
            </SocialLink>
          </div>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-8 text-sm text-slate-300 sm:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Company
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/services">Services</FooterLink>
              <FooterLink href="/case-studies">Case Studies</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/blog">Insights</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/terms">Terms of Use</FooterLink>
              <FooterLink href="/sitemap">Sitemap</FooterLink>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              <FooterLink href="/services/web-apps">Web Applications</FooterLink>
              <FooterLink href="/services/ecommerce">E-commerce</FooterLink>
              <FooterLink href="/services/branding">Brand Identity</FooterLink>
              <FooterLink href="/services/automation">Automation</FooterLink>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-slate-950/70">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {currentYear} CreaNode Studio. All rights reserved.</p>
          <p>
            Built with Next.js, Prisma, and SQLite. Infrastructure ready for
            OVH Hosting.
          </p>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href}
        className="transition hover:text-white hover:underline hover:underline-offset-4"
      >
        {children}
      </Link>
    </li>
  );
}

type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
};

function SocialLink({ href, label, children }: SocialLinkProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-800 text-slate-400 transition hover:border-slate-600 hover:text-white"
    >
      {children}
    </Link>
  );
}
