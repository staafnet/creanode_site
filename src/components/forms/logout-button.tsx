'use client';

import { useFormStatus } from "react-dom";
import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Submit />
    </form>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="ghost"
      size="sm"
      className="text-slate-300 hover:text-white"
      disabled={pending}
    >
      {pending ? "Wylogowywanie..." : "Wyloguj się"}
    </Button>
  );
}
