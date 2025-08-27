import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getMe from "./lib/api/auth/getMe";

const authPaths = ["/auth/login", "/auth/verify-email"];

const redirectToLogin = (reqUrl: string) =>
  NextResponse.redirect(new URL("/auth/login", reqUrl));

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = req.cookies.get("session")?.value;

  // redirect to home if session valid & user on auth pages
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (sessionCookie) {
      try {
        const user = await getMe();
        if (user.success) {
          return NextResponse.redirect(new URL("/dashboard", req.url));
        }
      } catch (error) {
        console.error("authPaths getMe failed:", error);
      }
    }
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return redirectToLogin(req.url);
  }

  // check session all pages except auth pages
  try {
    const user = await getMe();

    if (user.error) {
      return redirectToLogin(req.url);
    }

    return NextResponse.next();
  } catch (error) {
    return redirectToLogin(req.url);
  }
}

export const config = {
  matcher: [
    // Root route
    "/",
    // Protected routes that require authentication
    "/dashboard/:path*",
    "/chat/:path*",
    "/tasks/:path*",
    // Auth routes to redirect logged-in users
    "/auth/:path*",
  ],
};
