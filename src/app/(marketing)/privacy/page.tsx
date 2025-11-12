import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Zasady przetwarzania danych osobowych w CreaNode Studio.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold text-white md:text-5xl">
        Polityka prywatności
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
        <p>
          Niniejsza polityka opisuje zasady przetwarzania danych osobowych przez
          CreaNode Studio Sp. z o.o. Przetwarzamy dane wyłącznie w celu obsługi
          zapytań, świadczenia usług oraz komunikacji marketingowej za zgodą.
        </p>
        <p>
          Administratorem danych jest CreaNode Studio Sp. z o.o., ul. Postępu 14,
          02-676 Warszawa. Możesz skontaktować się z nami pod adresem
          contact@creanode.com.
        </p>
        <p>
          Dane przechowujemy w sposób bezpieczny, zgodnie z RODO. Masz prawo do
          wglądu, sprostowania, usunięcia oraz ograniczenia przetwarzania
          danych. W każdej chwili możesz także wnieść sprzeciw.
        </p>
        <p>
          W ramach hostingu OVH dbamy o regularne kopie zapasowe bazy SQLite, a
          dostęp do danych jest ograniczony do uprawnionych członków zespołu.
        </p>
      </div>
    </div>
  );
}
