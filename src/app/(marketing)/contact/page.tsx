import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ContactForm } from "@/components/forms/contact-form";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Kontakt — zaplanuj warsztat startowy",
  description:
    "Skontaktuj się z zespołem CreaNode Studio. Wypełnij brief lub zarezerwuj warsztat online.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-6">
      <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300/90">
            Kontakt
          </span>
          <h1 className="text-4xl font-semibold text-white md:text-5xl">
            Wypełnij krótki brief — wrócimy z propozycją warsztatu startowego w
            24 godziny.
          </h1>
          <p className="text-sm leading-relaxed text-slate-300">
            Pracujemy hybrydowo z biura w Warszawie oraz zdalnie dla klientów w
            całej Europie. Możemy umówić warsztat Discovery online lub onsite.
          </p>
          <div className="grid gap-4 text-sm text-slate-200">
            <ContactInfo
              icon={<Mail size={18} />}
              label="E-mail"
              value="contact@creanode.com"
              href="mailto:contact@creanode.com"
            />
            <ContactInfo
              icon={<Phone size={18} />}
              label="Telefon"
              value="+48 22 123 45 67"
              href="tel:+48221234567"
            />
            <ContactInfo
              icon={<MapPin size={18} />}
              label="Biuro"
              value="ul. Postępu 14, Warszawa"
              href="https://maps.google.com?q=Postępu+14,+Warszawa"
            />
          </div>
          <p className="text-xs text-slate-500">
            Administratorem danych jest CreaNode Studio Sp. z o.o. Wszelkie
            informacje przesłane poprzez formularz są objęte poufnością.
          </p>
        </div>
        <ContactForm />
      </div>

      <div className="mt-16 rounded-3xl border border-white/5 bg-white/5 p-8 text-sm text-slate-200">
        <h2 className="text-lg font-semibold text-white">
          Wolisz zaplanować spotkanie samodzielnie?
        </h2>
        <p className="mt-2 text-slate-300">
          Zarezerwuj termin warsztatu kick-off w naszym kalendarzu. Podczas
          spotkania omawiamy cele biznesowe, zakres MVP oraz plan kolejnych
          sprintów.
        </p>
        <Link
          href="https://cal.com"
          className="mt-4 inline-flex items-center text-sm font-semibold text-sky-300 hover:text-sky-200"
        >
          Zarezerwuj termin w kalendarzu →
        </Link>
      </div>
    </div>
  );
}

type ContactInfoProps = {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
};

function ContactInfo({ icon, label, value, href }: ContactInfoProps) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-sky-400/40"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/70 text-sky-300">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          {label}
        </p>
        <p className="text-sm text-white">{value}</p>
      </div>
    </Link>
  );
}
