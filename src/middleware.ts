import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authPaths = ["/auth/login", "/auth/register"];

const verifySession = async ({
  baseUrl,
  session,
}: {
  baseUrl: string;
  session: string;
}) => {
  return await fetch(`${baseUrl}/api/verify-session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session }),
  });
};

const redirectToLogin = (reqUrl: string) =>
  NextResponse.redirect(new URL("/auth/login", reqUrl));

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const sessionCookie = req.cookies.get("session")?.value;

  // redirect to home if session valid & user on auth pages
  if (authPaths.some((path) => pathname.startsWith(path))) {
    if (sessionCookie) {
      try {
        const sessionResponse = await verifySession({
          baseUrl: req.nextUrl.origin,
          session: sessionCookie,
        });
        if (sessionResponse.status === 200) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      } catch (error) {
        console.error("authPaths verifySession failed:", error);
      }
    }
    return NextResponse.next();
  }

  if (!sessionCookie) {
    return redirectToLogin(req.url);
  }

  // check session all pages except auth pages
  try {
    const sessionResponse = await verifySession({
      baseUrl: req.nextUrl.origin,
      session: sessionCookie,
    });

    if (sessionResponse.status !== 200) {
      return redirectToLogin(req.url);
    }
    return NextResponse.next();
  } catch (error) {
    return redirectToLogin(req.url);
  }
}

export const config = {
  matcher: ["/", "/auth/:path*"],
};
