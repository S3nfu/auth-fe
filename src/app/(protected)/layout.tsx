import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/session";


export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await requireUser();

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
