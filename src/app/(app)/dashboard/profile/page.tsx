import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-8 rounded-3xl border border-white/5 bg-white/5 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-white">Profil użytkownika</h1>
        <p className="mt-2 text-sm text-slate-300">
          Dane Twojej organizacji i preferencje komunikacji. Wkrótce dodamy
          możliwość ich aktualizacji oraz ustawień API.
        </p>
      </div>
      <dl className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Imię i nazwisko
          </dt>
          <dd className="mt-2 text-sm text-white">{user.name ?? "Użytkownik"}</dd>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Adres e-mail
          </dt>
          <dd className="mt-2 text-sm text-white">{user.email}</dd>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Rola
          </dt>
          <dd className="mt-2 text-sm text-white">
            {user.role === "ADMIN" ? "Administrator" : "Klient"}
          </dd>
        </div>
        <div className="rounded-2xl border border-white/5 bg-slate-950/60 p-5">
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Konto aktywne od
          </dt>
          <dd className="mt-2 text-sm text-white">
            {new Date(user.createdAt).toLocaleDateString("pl-PL")}
          </dd>
        </div>
      </dl>
      <div className="flex flex-wrap gap-3 text-xs">
        <Link href="/dashboard" className="font-semibold text-sky-300">
          Wróć do dashboardu →
        </Link>
        <Link href="/contact" className="text-slate-400 hover:text-white">
          Potrzebujesz zmian? Skontaktuj się z nami
        </Link>
      </div>
    </div>
  );
}
