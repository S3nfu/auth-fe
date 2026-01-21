import { cookies } from "next/headers";
import { auth } from "@/lib/auth";

export async function requireUser() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const session = await auth.api.getSession({
    headers: {
      cookie: cookieHeader,
    },
  });

  return session?.user ?? null;
}
