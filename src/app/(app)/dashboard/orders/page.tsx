import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function OrdersPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">Zamówienia</h1>
      <p className="text-sm text-slate-300">
        Wkrótce w tym miejscu pojawi się lista zamówień, status płatności oraz
        możliwość pobierania faktur.
      </p>
    </div>
  );
}
