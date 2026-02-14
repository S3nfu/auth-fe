import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Chráníme routes v (protected) složce
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    // Jen kontrolujeme přítomnost auth cookie
    const authCookie = request.cookies.get("better-auth.session_token");

    if (!authCookie) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};
