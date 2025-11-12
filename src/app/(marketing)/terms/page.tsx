import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warunki korzystania",
  description:
    "Zasady współpracy i korzystania z serwisu CreaNode Studio oraz sklepu online.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-20 md:px-6">
      <h1 className="text-4xl font-semibold text-white md:text-5xl">
        Warunki współpracy i korzystania
      </h1>
      <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-300">
        <p>
          Korzystając z serwisu oraz sklepu CreaNode Studio, akceptujesz poniższe
          warunki. Oferta kierowana jest do firm i organizacji, które
          współpracują z nami w modelu B2B.
        </p>
        <p>
          Umowy projektowe oraz abonamentowe zawieramy w formie pisemnej lub
          elektronicznej. Każde zlecenie posiada zdefiniowany zakres prac,
          harmonogram oraz wskaźniki sukcesu.
        </p>
        <p>
          Prawa autorskie do przygotowanych materiałów i kodu źródłowego
          przekazujemy klientom po dokonaniu pełnej płatności, zgodnie z
          zapisami umowy.
        </p>
        <p>
          W przypadku produktów cyfrowych dostępnych w sklepie online, prawo
          odstąpienia od umowy może być ograniczone z uwagi na cyfrowy charakter
          świadczenia (art. 38 ustawy o prawach konsumenta).
        </p>
      </div>
    </div>
  );
}
