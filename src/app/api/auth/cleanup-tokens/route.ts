import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join("; ");

  const session = await auth.api.getSession({ headers: { cookie: cookieHeader } });

  const userId = session?.user?.id;
  const sessionId = session?.session?.id;

  if (userId && sessionId) {
    await prisma.session.deleteMany({
      where: { userId, NOT: { id: sessionId } },
    });
  }

  return NextResponse.json({ ok: true });
}
