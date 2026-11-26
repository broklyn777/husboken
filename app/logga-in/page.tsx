import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = { title: "Logga in" };

export default function Page() {
  return (
    <>
      <div className="stack">
        <h2>Logga in</h2>
        <p className="lede">Loggen och era egna foton är bara för familjen. Skriv familjelösenordet så kommer du ihåg det i ett år på den här enheten.</p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </>
  );
}
