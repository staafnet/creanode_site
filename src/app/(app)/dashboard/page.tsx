import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-white">
        Witaj, {user.name ?? user.email}!
      </h1>
      <p className="text-sm text-slate-300">
        W kolejnym kroku dodamy tutaj przegląd projektów, status sprintów oraz
        skróty do zamówień i faktur.
      </p>
    </div>
  );
}
