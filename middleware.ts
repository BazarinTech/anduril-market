import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";
import { SESSION_COOKIE, isExpired, type SessionClaims } from "@/lib/session";

/**
 * What this middleware is, and what it is not.
 *
 * `jwtDecode` base64-decodes a token; it does not verify the signature. So
 * this is routing convenience, not an authorization boundary -- a hand-crafted
 * token still gets you the page shell. The real check is server-side: every
 * PHP endpoint calls JWT::decode() with the shared secret and rejects anything
 * unsigned, tampered with, or expired, so such a page renders with no data.
 *
 * Verifying signatures here needs an Edge-compatible library such as `jose`;
 * `jsonwebtoken` is Node-only and cannot run in middleware. What this can do
 * honestly is enforce expiry, so a stale session goes to /login instead of
 * rendering an app shell that then fails every API call.
 */
function readClaims(token: string): SessionClaims | null {
  try {
    return jwtDecode<SessionClaims>(token);
  } catch {
    return null;
  }
}

/** A usable session: parses, and has an `exp` still in the future. */
function hasLiveSession(token: string | undefined): boolean {
  if (!token) return false;
  const claims = readClaims(token);
  return claims !== null && !isExpired(claims);
}

const protectedRoutes = [
  "/bonus",
  "/cashout",
  "/cashout-wallet",
  "/company",
  "/home",
  "/incentive",
  "/mine",
  "/products",
  "/recharge",
  "/records",
  "/reset-password",
  "/team",
  "/work",
];

const authPages = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const { pathname } = req.nextUrl;
  const signedIn = hasLiveSession(token);

  // 1️⃣ Block access to protected routes if not logged in
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (signedIn) {
      return NextResponse.next();
    }

    // Missing, unparseable, or expired -- all mean "go and sign in", and the
    // stale cookie is cleared on the way so it stops being resent.
    const res = NextResponse.redirect(new URL("/login", req.url));
    if (token) res.cookies.delete(SESSION_COOKIE);
    return res;
  }

  // 2️⃣ Block access to auth pages if already logged in
  if (authPages.some(route => pathname.startsWith(route))) {
    if (signedIn) {
      // Already logged in → redirect to dashboard
      return NextResponse.redirect(new URL("/home", req.url));
    }

    if (token) {
      // Expired or invalid → clear it and let them sign in again
      const res = NextResponse.next();
      res.cookies.delete(SESSION_COOKIE);
      return res;
    }
  }

  // 3️⃣ Default: allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/bonus/:path*",
    "/cashout/:path*",
    "/cashout-wallet/:path*",
    "/company/:path*",
    "/home/:path*",
    "/incentive/:path*",
    "/mine/:path*",
    "/products/:path*",
    "/recharge/:path*",
    "/records/:path*",
    "/reset-password/:path*",
    "/team/:path*",
    "/work/:path*",
    "/login",
    "/register",
    "/forgot-password",
  ],
}

